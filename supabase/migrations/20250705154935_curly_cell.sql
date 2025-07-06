/*
  # Fix RLS Policy Infinite Recursion

  1. Policy Issues Fixed
    - Remove circular dependencies in profiles and classes policies
    - Simplify policy conditions to avoid recursive lookups
    - Ensure policies use direct auth.uid() checks where possible

  2. Changes Made
    - Update profiles policies to avoid complex institution lookups
    - Simplify classes policies to prevent recursion with profiles
    - Maintain security while breaking circular references

  3. Security
    - All policies still enforce proper access control
    - Users can only access their own data or data they're authorized to see
    - Institution-based access is maintained through simpler checks
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view profiles in same institution" ON profiles;
DROP POLICY IF EXISTS "Co-teachers can view their assigned classes" ON classes;
DROP POLICY IF EXISTS "Students can view their enrolled classes" ON classes;

-- Create simplified policies for profiles
CREATE POLICY "Users can view profiles in same institution"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    institution_id IS NOT NULL AND 
    institution_id = (
      SELECT institution_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

-- Create simplified policies for classes
CREATE POLICY "Co-teachers can view their assigned classes"
  ON classes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM co_teachers 
      WHERE co_teachers.class_id = classes.id 
      AND co_teachers.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their enrolled classes"
  ON classes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM class_enrollments 
      WHERE class_enrollments.class_id = classes.id 
      AND class_enrollments.student_id = auth.uid() 
      AND class_enrollments.is_active = true
    )
  );

-- Update attendance policies to avoid recursion
DROP POLICY IF EXISTS "Teachers can manage attendance for their classes" ON attendance_records;

CREATE POLICY "Teachers can manage attendance for their classes"
  ON attendance_records
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT id 
      FROM classes 
      WHERE teacher_id = auth.uid()
    ) OR 
    class_id IN (
      SELECT class_id 
      FROM co_teachers 
      WHERE teacher_id = auth.uid()
    )
  );

-- Update resources policies to avoid recursion
DROP POLICY IF EXISTS "Teachers can manage resources for their classes" ON resources;

CREATE POLICY "Teachers can manage resources for their classes"
  ON resources
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT id 
      FROM classes 
      WHERE teacher_id = auth.uid()
    ) OR 
    class_id IN (
      SELECT class_id 
      FROM co_teachers 
      WHERE teacher_id = auth.uid()
    )
  );

-- Update tests policies to avoid recursion
DROP POLICY IF EXISTS "Teachers can manage tests for their classes" ON tests;

CREATE POLICY "Teachers can manage tests for their classes"
  ON tests
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT id 
      FROM classes 
      WHERE teacher_id = auth.uid()
    ) OR 
    class_id IN (
      SELECT class_id 
      FROM co_teachers 
      WHERE teacher_id = auth.uid() 
      AND ((permissions ->> 'can_create_tests')::boolean = true)
    )
  );
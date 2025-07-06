/*
  # Fix RLS Policy Infinite Recursion

  1. Problem
    - Infinite recursion detected in policies for 'profiles' and 'classes' relations
    - Circular dependencies between table policies causing recursive lookups

  2. Solution
    - Simplify policies to avoid circular references
    - Use direct auth.uid() checks where possible
    - Remove complex subqueries that cause recursion

  3. Changes
    - Update profiles policies to be more direct
    - Update classes policies to avoid recursive joins
    - Ensure policies only check necessary relationships
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view profiles in same institution" ON profiles;
DROP POLICY IF EXISTS "Co-teachers can view their assigned classes" ON classes;
DROP POLICY IF EXISTS "Students can view their enrolled classes" ON classes;
DROP POLICY IF EXISTS "Teachers can manage their classes" ON classes;

-- Recreate profiles policies with simpler logic
CREATE POLICY "Users can view profiles in same institution"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    institution_id IN (
      SELECT p.institution_id 
      FROM profiles p 
      WHERE p.id = auth.uid()
    )
  );

-- Recreate classes policies with direct checks to avoid recursion
CREATE POLICY "Teachers can manage their classes"
  ON classes
  FOR ALL
  TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Students can view their enrolled classes"
  ON classes
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT ce.class_id 
      FROM class_enrollments ce 
      WHERE ce.student_id = auth.uid() 
      AND ce.is_active = true
    )
  );

CREATE POLICY "Co-teachers can view their assigned classes"
  ON classes
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT ct.class_id 
      FROM co_teachers ct 
      WHERE ct.teacher_id = auth.uid()
    )
  );

-- Update class_enrollments policies to be more direct
DROP POLICY IF EXISTS "Teachers can manage enrollments for their classes" ON class_enrollments;

CREATE POLICY "Teachers can manage enrollments for their classes"
  ON class_enrollments
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT c.id 
      FROM classes c 
      WHERE c.teacher_id = auth.uid()
    )
  );

-- Update attendance_records policies to be more direct
DROP POLICY IF EXISTS "Teachers can manage attendance for their classes" ON attendance_records;

CREATE POLICY "Teachers can manage attendance for their classes"
  ON attendance_records
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT c.id 
      FROM classes c 
      WHERE c.teacher_id = auth.uid()
    )
    OR
    class_id IN (
      SELECT ct.class_id 
      FROM co_teachers ct 
      WHERE ct.teacher_id = auth.uid()
    )
  );

-- Update resources policies to be more direct
DROP POLICY IF EXISTS "Teachers can manage resources for their classes" ON resources;

CREATE POLICY "Teachers can manage resources for their classes"
  ON resources
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT c.id 
      FROM classes c 
      WHERE c.teacher_id = auth.uid()
    )
    OR
    class_id IN (
      SELECT ct.class_id 
      FROM co_teachers ct 
      WHERE ct.teacher_id = auth.uid()
    )
  );

-- Update tests policies to be more direct
DROP POLICY IF EXISTS "Teachers can manage tests for their classes" ON tests;

CREATE POLICY "Teachers can manage tests for their classes"
  ON tests
  FOR ALL
  TO authenticated
  USING (
    class_id IN (
      SELECT c.id 
      FROM classes c 
      WHERE c.teacher_id = auth.uid()
    )
    OR
    class_id IN (
      SELECT ct.class_id 
      FROM co_teachers ct 
      WHERE ct.teacher_id = auth.uid()
      AND ((ct.permissions ->> 'can_create_tests'::text))::boolean = true
    )
  );
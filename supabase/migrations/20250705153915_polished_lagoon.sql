/*
  # Initial Schema for Tution Ghar App

  1. New Tables
    - `profiles` - User profiles extending Supabase auth.users
    - `institutions` - Tuition centers/institutes
    - `classes` - Class/subject management
    - `class_enrollments` - Student-class relationships
    - `attendance_records` - Daily attendance tracking
    - `resources` - Study materials and notes
    - `tests` - Test/exam management
    - `test_questions` - MCQ and subjective questions
    - `test_submissions` - Student test submissions
    - `notifications` - Push notifications
    - `co_teachers` - Additional teachers for classes

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure data access based on user roles and relationships

  3. Features
    - Support for multiple institutions
    - Role-based access (admin, teacher, student)
    - Real-time attendance and notifications
    - Comprehensive test management system
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');
CREATE TYPE test_type AS ENUM ('mcq', 'subjective', 'mixed');
CREATE TYPE question_type AS ENUM ('mcq', 'subjective');
CREATE TYPE resource_type AS ENUM ('pdf', 'image', 'link', 'video');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  role user_role NOT NULL DEFAULT 'student',
  institution_id uuid,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  description text,
  teacher_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  room_code text UNIQUE NOT NULL,
  schedule text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Class enrollments (student-class relationships)
CREATE TABLE IF NOT EXISTS class_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  UNIQUE(student_id, class_id)
);

-- Attendance records
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status attendance_status NOT NULL,
  marked_by uuid REFERENCES profiles(id),
  notes text,
  marked_at timestamptz DEFAULT now(),
  UNIQUE(student_id, class_id, date)
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type resource_type NOT NULL,
  url text NOT NULL,
  file_size bigint,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  uploaded_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  uploaded_at timestamptz DEFAULT now()
);

-- Tests table
CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type test_type NOT NULL DEFAULT 'mcq',
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  total_marks integer DEFAULT 0,
  duration_minutes integer,
  start_time timestamptz,
  end_time timestamptz,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Test questions
CREATE TABLE IF NOT EXISTS test_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  type question_type NOT NULL,
  marks integer NOT NULL DEFAULT 1,
  options jsonb, -- For MCQ options
  correct_answer text, -- For MCQ correct answer
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Test submissions
CREATE TABLE IF NOT EXISTS test_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  answers jsonb NOT NULL, -- Student answers
  score integer,
  submitted_at timestamptz DEFAULT now(),
  UNIQUE(test_id, student_id)
);

-- Co-teachers table
CREATE TABLE IF NOT EXISTS co_teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  added_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  permissions jsonb DEFAULT '{"can_mark_attendance": true, "can_upload_resources": true, "can_create_tests": false}',
  added_at timestamptz DEFAULT now(),
  UNIQUE(class_id, teacher_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'general',
  recipient_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE SET NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key constraint for institution_id in profiles
ALTER TABLE profiles ADD CONSTRAINT fk_profiles_institution 
  FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_institution ON classes(institution_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_student ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_class ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date);
CREATE INDEX IF NOT EXISTS idx_attendance_class_date ON attendance_records(class_id, date);
CREATE INDEX IF NOT EXISTS idx_resources_class ON resources(class_id);
CREATE INDEX IF NOT EXISTS idx_tests_class ON tests(class_id);
CREATE INDEX IF NOT EXISTS idx_test_questions_test ON test_questions(test_id);
CREATE INDEX IF NOT EXISTS idx_test_submissions_test ON test_submissions(test_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE co_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view profiles in same institution" ON profiles
  FOR SELECT USING (
    institution_id IN (
      SELECT institution_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Institutions policies
CREATE POLICY "Institution owners can manage their institution" ON institutions
  FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Institution members can view their institution" ON institutions
  FOR SELECT USING (
    id IN (
      SELECT institution_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Classes policies
CREATE POLICY "Teachers can manage their classes" ON classes
  FOR ALL USING (teacher_id = auth.uid());

CREATE POLICY "Students can view their enrolled classes" ON classes
  FOR SELECT USING (
    id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Co-teachers can view their assigned classes" ON classes
  FOR SELECT USING (
    id IN (
      SELECT class_id FROM co_teachers WHERE teacher_id = auth.uid()
    )
  );

-- Class enrollments policies
CREATE POLICY "Teachers can manage enrollments for their classes" ON class_enrollments
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own enrollments" ON class_enrollments
  FOR SELECT USING (student_id = auth.uid());

-- Attendance policies
CREATE POLICY "Teachers can manage attendance for their classes" ON attendance_records
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    ) OR
    class_id IN (
      SELECT class_id FROM co_teachers WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own attendance" ON attendance_records
  FOR SELECT USING (student_id = auth.uid());

-- Resources policies
CREATE POLICY "Teachers can manage resources for their classes" ON resources
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    ) OR
    class_id IN (
      SELECT class_id FROM co_teachers WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view resources for their classes" ON resources
  FOR SELECT USING (
    class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

-- Tests policies
CREATE POLICY "Teachers can manage tests for their classes" ON tests
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    ) OR
    class_id IN (
      SELECT class_id FROM co_teachers 
      WHERE teacher_id = auth.uid() 
      AND (permissions->>'can_create_tests')::boolean = true
    )
  );

CREATE POLICY "Students can view published tests for their classes" ON tests
  FOR SELECT USING (
    is_published = true AND
    class_id IN (
      SELECT class_id FROM class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

-- Test questions policies
CREATE POLICY "Teachers can manage questions for their tests" ON test_questions
  FOR ALL USING (
    test_id IN (
      SELECT id FROM tests WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Students can view questions for published tests" ON test_questions
  FOR SELECT USING (
    test_id IN (
      SELECT t.id FROM tests t
      JOIN class_enrollments ce ON t.class_id = ce.class_id
      WHERE t.is_published = true 
      AND ce.student_id = auth.uid() 
      AND ce.is_active = true
    )
  );

-- Test submissions policies
CREATE POLICY "Students can manage their own submissions" ON test_submissions
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view submissions for their tests" ON test_submissions
  FOR SELECT USING (
    test_id IN (
      SELECT id FROM tests WHERE created_by = auth.uid()
    )
  );

-- Co-teachers policies
CREATE POLICY "Teachers can view co-teachers for their classes" ON co_teachers
  FOR SELECT USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can manage co-teachers for their classes" ON co_teachers
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes WHERE teacher_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (recipient_id = auth.uid());

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
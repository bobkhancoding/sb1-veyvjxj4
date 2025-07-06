/*
  # Sample Data for Tution Ghar

  1. Sample Institution
    - Creates Sharma Tutorial Center as a sample institution
  
  2. Sample Classes
    - Physics Class 12
    - Mathematics Class 11  
    - Chemistry Class 10
    - English Class 9
    - Biology Class 12
  
  3. Sample Resources
    - PDF documents and video resources for each class
  
  4. Sample Tests
    - Mixed, MCQ, and subjective test types
    - Published and unpublished tests
  
  5. Sample Test Questions
    - MCQ questions with options and correct answers
    - Subjective questions for detailed responses
  
  6. Sample Notifications
    - Assignment, test, and announcement notifications
*/

-- Insert sample institution
INSERT INTO institutions (id, name, address, phone, email, owner_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Sharma Tutorial Center', 'Kathmandu, Nepal', '+977-9841234567', 'info@sharmatutorial.com', null);

-- Note: We'll update owner_id after creating the admin user

-- Insert sample users (these will be created when users sign up)
-- The profiles will be created via triggers when auth.users are created

-- Insert sample classes
INSERT INTO classes (id, name, subject, description, teacher_id, institution_id, room_code, schedule, is_active) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Physics - Class 12', 'Physics', 'Advanced Physics for Class 12 students preparing for board exams', null, '550e8400-e29b-41d4-a716-446655440000', 'PH001', 'Mon, Wed, Fri - 10:00 AM', true),
  ('660e8400-e29b-41d4-a716-446655440002', 'Mathematics - Class 11', 'Mathematics', 'Comprehensive Mathematics course for Class 11', null, '550e8400-e29b-41d4-a716-446655440000', 'MT002', 'Tue, Thu, Sat - 2:00 PM', true),
  ('660e8400-e29b-41d4-a716-446655440003', 'Chemistry - Class 10', 'Chemistry', 'Foundation Chemistry for Class 10 students', null, '550e8400-e29b-41d4-a716-446655440000', 'CH003', 'Mon, Wed, Fri - 4:00 PM', true),
  ('660e8400-e29b-41d4-a716-446655440004', 'English - Class 9', 'English', 'English Language and Literature', null, '550e8400-e29b-41d4-a716-446655440000', 'EN004', 'Daily - 11:00 AM', true),
  ('660e8400-e29b-41d4-a716-446655440005', 'Biology - Class 12', 'Biology', 'Advanced Biology for medical entrance preparation', null, '550e8400-e29b-41d4-a716-446655440000', 'BI005', 'Tue, Thu, Sat - 9:00 AM', true);

-- Insert sample resources
INSERT INTO resources (id, title, description, type, url, class_id, uploaded_by) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Physics Formula Sheet', 'Important formulas for mechanics and thermodynamics', 'pdf', 'https://example.com/physics-formulas.pdf', '660e8400-e29b-41d4-a716-446655440001', null),
  ('770e8400-e29b-41d4-a716-446655440002', 'Math Practice Problems', 'Calculus and algebra practice questions', 'pdf', 'https://example.com/math-practice.pdf', '660e8400-e29b-41d4-a716-446655440002', null),
  ('770e8400-e29b-41d4-a716-446655440003', 'Chemistry Lab Video', 'Demonstration of acid-base reactions', 'video', 'https://example.com/chemistry-lab.mp4', '660e8400-e29b-41d4-a716-446655440003', null),
  ('770e8400-e29b-41d4-a716-446655440004', 'English Grammar Guide', 'Comprehensive grammar rules and examples', 'pdf', 'https://example.com/english-grammar.pdf', '660e8400-e29b-41d4-a716-446655440004', null);

-- Insert sample tests
INSERT INTO tests (id, title, description, type, class_id, created_by, total_marks, duration_minutes, is_published) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', 'Physics Mid-term Exam', 'Mid-term examination covering mechanics and waves', 'mixed', '660e8400-e29b-41d4-a716-446655440001', null, 100, 120, true),
  ('880e8400-e29b-41d4-a716-446655440002', 'Math Quiz - Calculus', 'Quick quiz on differentiation and integration', 'mcq', '660e8400-e29b-41d4-a716-446655440002', null, 50, 45, true),
  ('880e8400-e29b-41d4-a716-446655440003', 'Chemistry Lab Test', 'Practical knowledge test on chemical reactions', 'subjective', '660e8400-e29b-41d4-a716-446655440003', null, 75, 90, false);

-- Insert sample test questions
INSERT INTO test_questions (id, test_id, question_text, type, marks, options, correct_answer, order_index) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440002', 'What is the derivative of x²?', 'mcq', 5, '["x", "2x", "x²", "2x²"]', '2x', 1),
  ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'Integrate ∫2x dx', 'mcq', 5, '["x²", "x² + C", "2x²", "2x² + C"]', 'x² + C', 2),
  ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002', 'What is the limit of (sin x)/x as x approaches 0?', 'mcq', 5, '["0", "1", "∞", "undefined"]', '1', 3),
  ('990e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440001', 'Explain Newton''s second law of motion with examples.', 'subjective', 15, null, null, 1),
  ('990e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440001', 'A ball is thrown upward with initial velocity 20 m/s. Calculate the maximum height reached.', 'subjective', 20, null, null, 2);

-- Insert sample notifications
INSERT INTO notifications (id, title, message, type, recipient_id, class_id) VALUES
  ('aa0e8400-e29b-41d4-a716-446655440001', 'New Assignment Posted', 'Physics assignment on mechanics has been uploaded', 'assignment', null, '660e8400-e29b-41d4-a716-446655440001'),
  ('aa0e8400-e29b-41d4-a716-446655440002', 'Test Reminder', 'Math quiz scheduled for tomorrow at 2:00 PM', 'test', null, '660e8400-e29b-41d4-a716-446655440002'),
  ('aa0e8400-e29b-41d4-a716-446655440003', 'Class Cancelled', 'Chemistry class cancelled due to teacher unavailability', 'announcement', null, '660e8400-e29b-41d4-a716-446655440003');
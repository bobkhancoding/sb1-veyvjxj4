export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'teacher' | 'student';
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'teacher' | 'student';
  institution_id?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  institution?: Institution;
}

export interface Institution {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  owner_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  description?: string;
  teacher_id: string;
  teacher_name: string;
  institution_id: string;
  room_code: string;
  schedule?: string;
  is_active: boolean;
  student_count: number;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  full_name: string;
  phone?: string;
  email?: string;
  parent_phone?: string;
  class_id: string;
  enrollment_date: string;
  status: 'active' | 'inactive';
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  class_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  marked_by?: string;
  notes?: string;
  marked_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'pdf' | 'image' | 'link' | 'video';
  url: string;
  file_size?: number;
  class_id: string;
  uploaded_by: string;
  uploaded_at: string;
}

export interface Test {
  id: string;
  title: string;
  description?: string;
  type: 'mcq' | 'subjective' | 'mixed';
  class_id: string;
  created_by: string;
  total_marks: number;
  duration_minutes?: number;
  start_time?: string;
  end_time?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestQuestion {
  id: string;
  test_id: string;
  question_text: string;
  type: 'mcq' | 'subjective';
  marks: number;
  options?: string[];
  correct_answer?: string;
  order_index: number;
  created_at: string;
}

export interface TestSubmission {
  id: string;
  test_id: string;
  student_id: string;
  answers: Record<string, any>;
  score?: number;
  submitted_at: string;
}

export interface CoTeacher {
  id: string;
  class_id: string;
  teacher_id: string;
  added_by: string;
  permissions: {
    can_mark_attendance: boolean;
    can_upload_resources: boolean;
    can_create_tests: boolean;
  };
  added_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  recipient_id: string;
  class_id?: string;
  is_read: boolean;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface CreateClassForm {
  name: string;
  subject: string;
  description?: string;
  schedule?: string;
  room_code: string;
}

export interface CreateTestForm {
  title: string;
  description?: string;
  type: 'mcq' | 'subjective' | 'mixed';
  duration_minutes?: number;
  start_time?: string;
  end_time?: string;
}

export interface AttendanceForm {
  student_id: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}

// Statistics types
export interface DashboardStats {
  totalClasses: number;
  totalStudents: number;
  todayAttendance: number;
  upcomingTests: number;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  total: number;
}

export interface ClassStats {
  totalStudents: number;
  averageAttendance: number;
  totalResources: number;
  totalTests: number;
}
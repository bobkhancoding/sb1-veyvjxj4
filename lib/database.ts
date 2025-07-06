import { supabase } from './supabase';
import type { 
  User, 
  Class, 
  Student, 
  AttendanceRecord, 
  Resource, 
  Test,
  TestQuestion,
  TestSubmission,
  Notification,
  Institution,
  Profile
} from '@/types';

// Profile operations
export const profileService = {
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        institution:institutions(*)
      `)
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getProfilesByInstitution(institutionId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('institution_id', institutionId);

    if (error) throw error;
    return data || [];
  }
};

// Institution operations
export const institutionService = {
  async createInstitution(institution: Omit<Institution, 'id' | 'created_at' | 'updated_at'>): Promise<Institution> {
    const { data, error } = await supabase
      .from('institutions')
      .insert(institution)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getInstitution(id: string): Promise<Institution | null> {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

// Class operations
export const classService = {
  async getClasses(): Promise<Class[]> {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:profiles!classes_teacher_id_fkey(full_name),
        _count:class_enrollments(count)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      ...item,
      teacher_name: item.teacher?.full_name || 'Unknown',
      student_count: item._count?.[0]?.count || 0
    }));
  },

  async getClass(id: string): Promise<Class | null> {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:profiles!classes_teacher_id_fkey(full_name),
        _count:class_enrollments(count)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      teacher_name: data.teacher?.full_name || 'Unknown',
      student_count: data._count?.[0]?.count || 0
    };
  },

  async createClass(classData: Omit<Class, 'id' | 'created_at' | 'updated_at' | 'teacher_name' | 'student_count'>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select()
      .single();

    if (error) throw error;
    return { ...data, teacher_name: '', student_count: 0 };
  },

  async updateClass(id: string, updates: Partial<Class>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { ...data, teacher_name: '', student_count: 0 };
  },

  async deleteClass(id: string): Promise<void> {
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Student operations
export const studentService = {
  async getStudents(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        enrollments:class_enrollments!class_enrollments_student_id_fkey(
          class_id,
          enrolled_at,
          is_active,
          class:classes(name, subject)
        )
      `)
      .eq('role', 'student')
      .eq('enrollments.is_active', true);

    if (error) throw error;
    
    return (data || []).map(profile => ({
      id: profile.id,
      full_name: profile.full_name,
      phone: profile.phone,
      email: '', // Will be fetched from auth.users if needed
      parent_phone: profile.phone, // Assuming same for now
      class_id: profile.enrollments[0]?.class_id || '',
      enrollment_date: profile.enrollments[0]?.enrolled_at || profile.created_at,
      status: profile.enrollments[0]?.is_active ? 'active' : 'inactive'
    }));
  },

  async getStudentsByClass(classId: string): Promise<Student[]> {
    const { data, error } = await supabase
      .from('class_enrollments')
      .select(`
        *,
        student:profiles!class_enrollments_student_id_fkey(*)
      `)
      .eq('class_id', classId)
      .eq('is_active', true);

    if (error) throw error;
    
    return (data || []).map(enrollment => ({
      id: enrollment.student.id,
      full_name: enrollment.student.full_name,
      phone: enrollment.student.phone,
      email: '',
      parent_phone: enrollment.student.phone,
      class_id: classId,
      enrollment_date: enrollment.enrolled_at,
      status: enrollment.is_active ? 'active' : 'inactive'
    }));
  },

  async enrollStudent(studentId: string, classId: string): Promise<void> {
    const { error } = await supabase
      .from('class_enrollments')
      .insert({
        student_id: studentId,
        class_id: classId,
        is_active: true
      });

    if (error) throw error;
  }
};

// Attendance operations
export const attendanceService = {
  async getAttendanceByClass(classId: string, date?: string): Promise<AttendanceRecord[]> {
    let query = supabase
      .from('attendance_records')
      .select(`
        *,
        student:profiles!attendance_records_student_id_fkey(full_name)
      `)
      .eq('class_id', classId);

    if (date) {
      query = query.eq('date', date);
    }

    const { data, error } = await query.order('marked_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async markAttendance(records: Omit<AttendanceRecord, 'id' | 'marked_at'>[]): Promise<void> {
    const { error } = await supabase
      .from('attendance_records')
      .upsert(records, {
        onConflict: 'student_id,class_id,date'
      });

    if (error) throw error;
  },

  async getAttendanceStats(classId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('attendance_records')
      .select('status')
      .eq('class_id', classId);

    if (startDate) query = query.gte('date', startDate);
    if (endDate) query = query.lte('date', endDate);

    const { data, error } = await query;

    if (error) throw error;

    const stats = {
      present: 0,
      absent: 0,
      late: 0,
      total: data?.length || 0
    };

    data?.forEach(record => {
      stats[record.status]++;
    });

    return stats;
  }
};

// Resource operations
export const resourceService = {
  async getResourcesByClass(classId: string): Promise<Resource[]> {
    const { data, error } = await supabase
      .from('resources')
      .select(`
        *,
        uploader:profiles!resources_uploaded_by_fkey(full_name)
      `)
      .eq('class_id', classId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createResource(resource: Omit<Resource, 'id' | 'uploaded_at'>): Promise<Resource> {
    const { data, error } = await supabase
      .from('resources')
      .insert(resource)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteResource(id: string): Promise<void> {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Test operations
export const testService = {
  async getTestsByClass(classId: string): Promise<Test[]> {
    const { data, error } = await supabase
      .from('tests')
      .select(`
        *,
        creator:profiles!tests_created_by_fkey(full_name),
        _count:test_questions(count)
      `)
      .eq('class_id', classId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createTest(test: Omit<Test, 'id' | 'created_at' | 'updated_at'>): Promise<Test> {
    const { data, error } = await supabase
      .from('tests')
      .insert(test)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getTestQuestions(testId: string): Promise<TestQuestion[]> {
    const { data, error } = await supabase
      .from('test_questions')
      .select('*')
      .eq('test_id', testId)
      .order('order_index');

    if (error) throw error;
    return data || [];
  },

  async submitTest(submission: Omit<TestSubmission, 'id' | 'submitted_at'>): Promise<TestSubmission> {
    const { data, error } = await supabase
      .from('test_submissions')
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Notification operations
export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data || [];
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
  },

  async createNotification(notification: Omit<Notification, 'id' | 'created_at' | 'is_read'>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Authentication helpers
export const authService = {
  async signUp(email: string, password: string, userData: { full_name: string; phone?: string; role: 'admin' | 'teacher' | 'student' }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};

export { authService, profileService }
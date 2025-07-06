export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          role: 'admin' | 'teacher' | 'student';
          institution_id: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          role?: 'admin' | 'teacher' | 'student';
          institution_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string | null;
          role?: 'admin' | 'teacher' | 'student';
          institution_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      institutions: {
        Row: {
          id: string;
          name: string;
          address: string | null;
          phone: string | null;
          email: string | null;
          owner_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      classes: {
        Row: {
          id: string;
          name: string;
          subject: string;
          description: string | null;
          teacher_id: string;
          institution_id: string;
          room_code: string;
          schedule: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subject: string;
          description?: string | null;
          teacher_id: string;
          institution_id: string;
          room_code: string;
          schedule?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          subject?: string;
          description?: string | null;
          teacher_id?: string;
          institution_id?: string;
          room_code?: string;
          schedule?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      class_enrollments: {
        Row: {
          id: string;
          student_id: string;
          class_id: string;
          enrolled_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          student_id: string;
          class_id: string;
          enrolled_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          student_id?: string;
          class_id?: string;
          enrolled_at?: string;
          is_active?: boolean;
        };
      };
      attendance_records: {
        Row: {
          id: string;
          student_id: string;
          class_id: string;
          date: string;
          status: 'present' | 'absent' | 'late';
          marked_by: string | null;
          notes: string | null;
          marked_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          class_id: string;
          date?: string;
          status: 'present' | 'absent' | 'late';
          marked_by?: string | null;
          notes?: string | null;
          marked_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          class_id?: string;
          date?: string;
          status?: 'present' | 'absent' | 'late';
          marked_by?: string | null;
          notes?: string | null;
          marked_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          type: 'pdf' | 'image' | 'link' | 'video';
          url: string;
          file_size: number | null;
          class_id: string;
          uploaded_by: string;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          type: 'pdf' | 'image' | 'link' | 'video';
          url: string;
          file_size?: number | null;
          class_id: string;
          uploaded_by: string;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          type?: 'pdf' | 'image' | 'link' | 'video';
          url?: string;
          file_size?: number | null;
          class_id?: string;
          uploaded_by?: string;
          uploaded_at?: string;
        };
      };
      tests: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          type: 'mcq' | 'subjective' | 'mixed';
          class_id: string;
          created_by: string;
          total_marks: number;
          duration_minutes: number | null;
          start_time: string | null;
          end_time: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          type?: 'mcq' | 'subjective' | 'mixed';
          class_id: string;
          created_by: string;
          total_marks?: number;
          duration_minutes?: number | null;
          start_time?: string | null;
          end_time?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          type?: 'mcq' | 'subjective' | 'mixed';
          class_id?: string;
          created_by?: string;
          total_marks?: number;
          duration_minutes?: number | null;
          start_time?: string | null;
          end_time?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      test_questions: {
        Row: {
          id: string;
          test_id: string;
          question_text: string;
          type: 'mcq' | 'subjective';
          marks: number;
          options: any | null;
          correct_answer: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          test_id: string;
          question_text: string;
          type: 'mcq' | 'subjective';
          marks?: number;
          options?: any | null;
          correct_answer?: string | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          test_id?: string;
          question_text?: string;
          type?: 'mcq' | 'subjective';
          marks?: number;
          options?: any | null;
          correct_answer?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      test_submissions: {
        Row: {
          id: string;
          test_id: string;
          student_id: string;
          answers: any;
          score: number | null;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          test_id: string;
          student_id: string;
          answers: any;
          score?: number | null;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          test_id?: string;
          student_id?: string;
          answers?: any;
          score?: number | null;
          submitted_at?: string;
        };
      };
      co_teachers: {
        Row: {
          id: string;
          class_id: string;
          teacher_id: string;
          added_by: string;
          permissions: any;
          added_at: string;
        };
        Insert: {
          id?: string;
          class_id: string;
          teacher_id: string;
          added_by: string;
          permissions?: any;
          added_at?: string;
        };
        Update: {
          id?: string;
          class_id?: string;
          teacher_id?: string;
          added_by?: string;
          permissions?: any;
          added_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          title: string;
          message: string;
          type: string;
          recipient_id: string;
          class_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          message: string;
          type?: string;
          recipient_id: string;
          class_id?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          message?: string;
          type?: string;
          recipient_id?: string;
          class_id?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'teacher' | 'student';
      attendance_status: 'present' | 'absent' | 'late';
      test_type: 'mcq' | 'subjective' | 'mixed';
      question_type: 'mcq' | 'subjective';
      resource_type: 'pdf' | 'image' | 'link' | 'video';
    };
  };
}
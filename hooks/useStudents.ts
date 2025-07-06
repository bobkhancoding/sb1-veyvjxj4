import { useQuery, useMutation, useQueryClient } from 'react-query';
import { studentService } from '@/lib/database';
import type { Student } from '@/types';

export function useStudents() {
  const queryClient = useQueryClient();

  const {
    data: students = [],
    isLoading,
    error,
    refetch
  } = useQuery('students', studentService.getStudents);

  const enrollStudentMutation = useMutation(
    ({ studentId, classId }: { studentId: string; classId: string }) =>
      studentService.enrollStudent(studentId, classId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('classes');
      }
    }
  );

  return {
    students,
    isLoading,
    error,
    refetch,
    enrollStudent: enrollStudentMutation.mutate,
    isEnrolling: enrollStudentMutation.isLoading
  };
}

export function useStudentsByClass(classId: string) {
  const {
    data: students = [],
    isLoading,
    error
  } = useQuery(
    ['students', 'class', classId],
    () => studentService.getStudentsByClass(classId),
    {
      enabled: !!classId
    }
  );

  return {
    students,
    isLoading,
    error
  };
}
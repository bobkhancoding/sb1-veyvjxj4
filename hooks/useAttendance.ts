import { useQuery, useMutation, useQueryClient } from 'react-query';
import { attendanceService } from '@/lib/database';
import type { AttendanceRecord, AttendanceForm } from '@/types';

export function useAttendance(classId: string, date?: string) {
  const queryClient = useQueryClient();

  const {
    data: attendance = [],
    isLoading,
    error,
    refetch
  } = useQuery(
    ['attendance', classId, date],
    () => attendanceService.getAttendanceByClass(classId, date),
    {
      enabled: !!classId
    }
  );

  const markAttendanceMutation = useMutation(
    (records: Omit<AttendanceRecord, 'id' | 'marked_at'>[]) =>
      attendanceService.markAttendance(records),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['attendance', classId]);
      }
    }
  );

  return {
    attendance,
    isLoading,
    error,
    refetch,
    markAttendance: markAttendanceMutation.mutate,
    isMarking: markAttendanceMutation.isLoading
  };
}

export function useAttendanceStats(classId: string, startDate?: string, endDate?: string) {
  const {
    data: stats,
    isLoading,
    error
  } = useQuery(
    ['attendance-stats', classId, startDate, endDate],
    () => attendanceService.getAttendanceStats(classId, startDate, endDate),
    {
      enabled: !!classId
    }
  );

  return {
    stats,
    isLoading,
    error
  };
}
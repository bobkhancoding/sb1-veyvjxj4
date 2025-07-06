import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { classService } from '@/lib/database';
import type { Class, CreateClassForm } from '@/types';

export function useClasses() {
  const queryClient = useQueryClient();

  const {
    data: classes = [],
    isLoading,
    error,
    refetch
  } = useQuery('classes', classService.getClasses);

  const createClassMutation = useMutation(
    (classData: CreateClassForm & { teacher_id: string; institution_id: string }) =>
      classService.createClass(classData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classes');
      }
    }
  );

  const updateClassMutation = useMutation(
    ({ id, updates }: { id: string; updates: Partial<Class> }) =>
      classService.updateClass(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classes');
      }
    }
  );

  const deleteClassMutation = useMutation(
    (id: string) => classService.deleteClass(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classes');
      }
    }
  );

  return {
    classes,
    isLoading,
    error,
    refetch,
    createClass: createClassMutation.mutate,
    updateClass: updateClassMutation.mutate,
    deleteClass: deleteClassMutation.mutate,
    isCreating: createClassMutation.isLoading,
    isUpdating: updateClassMutation.isLoading,
    isDeleting: deleteClassMutation.isLoading
  };
}

export function useClass(id: string) {
  const {
    data: classData,
    isLoading,
    error
  } = useQuery(['class', id], () => classService.getClass(id), {
    enabled: !!id
  });

  return {
    class: classData,
    isLoading,
    error
  };
}
import { postClinicConnection } from '@/service/connection';
import { useMutation } from '@tanstack/react-query';

export function useRequesClinicConnection() {
  return useMutation({
    mutationFn: postClinicConnection,
  });
}

import uploadImage from '@/service/upload';
import { useMutation } from '@tanstack/react-query';

export default function useUploadImage() {
  return useMutation({ mutationFn: uploadImage });
}

import { post } from '@/config/api';
import { IPostUploadImageResponse } from '@/types/ApiResponse';
import { IPayloadUploadImage } from '@/types/paramTypes';

export default async function uploadImage(payload: IPayloadUploadImage) {
  return post<IPostUploadImageResponse>('/admin/cdn/image', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

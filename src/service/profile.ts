import { get, post, put } from '@/app/api/api';
import { IGetProfileResponse } from '@/types/ApiResponse';
import { IPayloadUpdatePassword } from '@/types/paramTypes';

export async function getProfile() {
  return await get<IGetProfileResponse>('/patient/profile').then(
    (res) => res.data
  );
}

export async function putUpdatePassword(params: IPayloadUpdatePassword) {
  return await put('/admin/profile/password', params);
}

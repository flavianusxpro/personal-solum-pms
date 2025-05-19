import { get, post, put } from '@/config/api';
import { IGetProfileResponse } from '@/types/ApiResponse';
import { IPayloadUpdatePassword } from '@/types/paramTypes';

export async function getProfile() {
  return await get<IGetProfileResponse>('/admin/profile').then(
    (res) => res.data
  );
}

export async function putUpdatePassword(params: IPayloadUpdatePassword) {
  return await put('/admin/profile/password', params);
}

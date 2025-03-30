import { get, post } from '@/app/api/api';
import { IGetProfileResponse } from '@/types/ApiResponse';

export async function getProfile() {
  return await get<IGetProfileResponse>('/patient/profile').then(
    (res) => res.data
  );
}

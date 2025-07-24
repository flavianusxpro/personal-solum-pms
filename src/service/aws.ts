import { get, put } from '@/config/base-api';
import { IGetAwsS3ConfigResponse } from '@/types/ApiResponse';
import { IPayloadUpdateAwsS3Config } from '@/types/paramTypes';

export async function getAwsS3Config(clinicId?: number) {
  return await get<IGetAwsS3ConfigResponse>('/admin/setting/s3', {
    params: {
      clinicId,
    },
  });
}

export async function updateAwsS3Config(paylaod: IPayloadUpdateAwsS3Config) {
  return await put('/admin/setting/s3', paylaod);
}

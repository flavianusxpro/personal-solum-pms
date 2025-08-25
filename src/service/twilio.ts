import { get, put } from '@/config/base-api';
import { IGetTwilioConfigResponse } from '@/types/ApiResponse';
import { IPayloadUpdateTwilioConfig } from '@/types/paramTypes';

export async function getTwilioConfig(clinicId?: number) {
  return get<IGetTwilioConfigResponse>('/admin/setting/twilio', {
    params: {
      clinicId,
    },
  });
}

export async function putUpdateTwilioConfig(
  payload: IPayloadUpdateTwilioConfig
) {
  return put('/admin/setting/twilio', payload);
}

import { get, put } from '@/app/api/api';
import { IGetTwilioConfigResponse } from '@/types/ApiResponse';
import { IPayloadUpdateTwilioConfig } from '@/types/paramTypes';

export async function getTwilioConfig() {
  return get<IGetTwilioConfigResponse>('/admin/setting/twilio');
}

export async function putUpdateTwilioConfig(
  payload: IPayloadUpdateTwilioConfig
) {
  return put('/admin/setting/twilio', payload);
}

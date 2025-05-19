import { get, put } from '@/config/api';
import { IGetSmtpConfigResponse } from '@/types/ApiResponse';
import { IPayloadUpdateSmtpConfig } from '@/types/paramTypes';

export async function getSmptConfig() {
  return get<IGetSmtpConfigResponse>('/admin/setting/smtp');
}

export async function putUpdateSmptConfig(payload: IPayloadUpdateSmtpConfig) {
  return put('/admin/setting/smtp', payload);
}

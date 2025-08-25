import { get, put } from '@/config/base-api';
import {
  IGetEmailNotificationSettingsResponse,
  IGetSmsNotificationSettingsResponse,
} from '@/types/ApiResponse';
import {
  IPayloadUpdateEmailNotificationSettings,
  IPayloadUpdateSmsNotificationSettings,
} from '@/types/paramTypes';

export async function getEmailNotificationSettings(clinicId?: number) {
  return get<IGetEmailNotificationSettingsResponse>(
    `/admin/notification/email?clinicId=${clinicId}`
  ).then((res) => res.data);
}

export async function getSmsNotificationSettings(clinicId?: number) {
  return get<IGetSmsNotificationSettingsResponse>(
    `/admin/notification/sms?clinicId=${clinicId}`
  ).then((res) => res.data);
}

export async function putEmailNotificationSettings(
  payload: IPayloadUpdateEmailNotificationSettings
) {
  return put('/admin/notification/email', payload);
}

export async function putSmsNotificationSettings(
  payload: IPayloadUpdateSmsNotificationSettings
) {
  return put('/admin/notification/sms', payload);
}

import { del, get, post, put } from '@/config/base-api';
import {
  IGetEmailTemplatesResponse,
  IGetSmsTemplatesResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllEmailTemplates,
  IParamGetAllSmsTemplates,
  IPayloadCreateEditEmailTemplate,
  IPayloadCreateEditSmsTemplate,
} from '@/types/paramTypes';

export async function getEmailTemplates(params: IParamGetAllEmailTemplates) {
  return get<IGetEmailTemplatesResponse>('/admin/template/email', {
    params,
  }).then((res) => res.data);
}

export async function getSmsTemplates(params: IParamGetAllSmsTemplates) {
  return get<IGetSmsTemplatesResponse>('/admin/template/sms', { params }).then(
    (res) => res.data
  );
}

export async function postEmailTemplate(
  payload: IPayloadCreateEditEmailTemplate
) {
  return post<any>('/admin/template/email', payload).then((res) => res.data);
}

export async function putEmailTemplate(
  payload: IPayloadCreateEditEmailTemplate
) {
  return put<any>('/admin/template/email/' + payload.id, payload);
}

export async function postSmsTemplate(payload: IPayloadCreateEditSmsTemplate) {
  return post<any>('/admin/template/sms', payload).then((res) => res.data);
}

export async function putSmsTemplate(payload: IPayloadCreateEditSmsTemplate) {
  return put<any>('/admin/template/sms/' + payload.id, payload);
}

export async function deleteEmailTemplate(id: string) {
  return del<any>('/admin/template/email/' + id);
}

export async function deleteSmsTemplate(id: string) {
  return del<any>('/admin/template/sms/' + id);
}

import { del, get, post, put } from '@/config/base-api';
import {
  IGetApiKeyConnectionResponse,
  IPostConnectMainClinicResponse,
} from '@/types/ApiResponse';
import {
  IParamsGetApiConnection,
  IPayloadClinicConnection,
  IPayloadCreateEditApiConnection,
} from '@/types/paramTypes';

export async function postClinicConnection(payload: IPayloadClinicConnection) {
  return await post<IPostConnectMainClinicResponse>(
    '/api/connection/connect',
    payload
  );
}

export async function getApiKeyConnection(params: IParamsGetApiConnection) {
  return await get<IGetApiKeyConnectionResponse>('/admin/setting/apis', {
    params,
  });
}

export async function postCreateApiKeyConnection(
  payload: IPayloadCreateEditApiConnection
) {
  return await post('/admin/setting/apis', payload);
}

export async function putUpdateApiKeyConnection(
  payload: IPayloadCreateEditApiConnection
) {
  return await put('/admin/setting/apis/' + payload.id, payload);
}

export async function deleteApiKeyConnection(ids: number[]) {
  return await del('/admin/setting/apis', { data: { ids } });
}

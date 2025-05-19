import { del, get, post, put } from '@/config/api';
import {
  IGetPermissionsResponse,
  IGetRolesResponse,
} from '@/types/ApiResponse';
import {
  IParamGetPermissions,
  IPayloadCreateEditRole,
} from '@/types/paramTypes';

export async function getRoles() {
  return get<IGetRolesResponse>('/admin/user/roles').then((res) => res.data);
}

export async function postCreateRole(payload: IPayloadCreateEditRole) {
  return post<IGetRolesResponse>('/admin/user/roles', payload);
}

export async function putUpdateRole(payload: IPayloadCreateEditRole) {
  return put<IGetRolesResponse>(`/admin/user/roles/${payload?.id}`, payload);
}

export async function deleteRole(id: string) {
  return del<IGetRolesResponse>(`/admin/user/roles/${id}`);
}

export async function getPermissions(params: IParamGetPermissions) {
  return get<IGetPermissionsResponse>('/admin/user/permissions', {
    params,
  }).then((res) => res.data);
}

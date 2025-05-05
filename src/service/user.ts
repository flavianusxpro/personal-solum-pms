import { del, get, post, put } from '@/app/api/api';
import {
  IGetPermissionsResponse,
  IGetRolesResponse,
  IGetUserByIdResponse,
  IGetUsersResponse,
} from '@/types/ApiResponse';
import {
  IParamGetPermissions,
  IParamGetRoles,
  IParamGetUsers,
  IPayloadCreateDoctorUser,
  IPayloadCreateUser,
  IPayloadUpdateUser,
} from '@/types/paramTypes';

export async function postCreateDoctorUser(payload: IPayloadCreateDoctorUser) {
  return post('/admin/user', payload);
}

export async function postCreateUser(payload: IPayloadCreateUser) {
  return post('/admin/user', payload);
}

export async function getRoles(params: IParamGetRoles) {
  return get<IGetRolesResponse>('/admin/user/roles', { params }).then(
    (res) => res.data
  );
}

export async function getUsers(params: IParamGetUsers) {
  return get<IGetUsersResponse>('/admin/user', {
    params,
  });
}

export async function getUserById(id: string) {
  return get<IGetUserByIdResponse>('/admin/user/detail/' + id).then(
    (res) => res.data
  );
}

export async function putUpdateUserById(payload: IPayloadUpdateUser) {
  return put('/admin/user/' + payload.id, payload);
}

export async function deleteUserById(id: string) {
  return del('/admin/user/' + id);
}

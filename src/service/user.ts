import { get, post } from '@/app/api/api';
import { IGetRolesResponse, IGetUsersResponse } from '@/types/ApiResponse';
import {
  IParamGetRoles,
  IParamGetUsers,
  IPayloadCreateDoctorUser,
} from '@/types/paramTypes';

export async function postCreateDoctorUser(payload: IPayloadCreateDoctorUser) {
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

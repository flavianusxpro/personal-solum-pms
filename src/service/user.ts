import { get, post } from '@/app/api/api';
import { IGetRolesResponse } from '@/types/ApiResponse';
import { IParamGetRoles, IPayloadCreateDoctorUser } from '@/types/paramTypes';

export async function postCreateDoctorUser(payload: IPayloadCreateDoctorUser) {
  return post('/admin/user', payload);
}

export async function getRoles(params: IParamGetRoles) {
  return get<IGetRolesResponse>('/admin/user/roles').then((res) => res.data);
}

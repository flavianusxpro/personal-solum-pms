import { get, post, put } from '@/app/api/api';
import {
  IGetAllDoctorsResponse,
  IGetDoctorByClinicForPatientResponse,
  IGetDoctorByIdResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllDoctor,
  IParamGetDoctorByClinicForPatient,
  IPayloadCreateEditDoctor,
} from '@/types/paramTypes';

export async function getDoctorByClinicForPatient(
  params: IParamGetDoctorByClinicForPatient
) {
  return await get<IGetDoctorByClinicForPatientResponse>(
    '/patient/clinic/' + params.id + '/doctor',
    {
      params,
    }
  ).then((res) => res.data);
}

export async function getDoctorList(params: IParamGetAllDoctor) {
  return await get<IGetAllDoctorsResponse>('/admin/doctor', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function getDoctorById(id: string) {
  return await get<IGetDoctorByIdResponse>(`/admin/doctor/detail/${id}`).then(
    (res) => {
      return res.data;
    }
  );
}
export async function postCreateDoctor(payload: IPayloadCreateEditDoctor) {
  return await post<any>('/admin/doctor', payload);
}

export async function putCreateDoctor(payload: IPayloadCreateEditDoctor) {
  return await put<any>('/admin/doctor/' + payload.doctor_id, payload);
}

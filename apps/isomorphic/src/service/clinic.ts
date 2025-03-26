import { get } from '@/app/api/api';
import {
  IGetAllClinicForPatientResponse,
  IGetClinicByIdForPatientResponse,
} from '@/types/ApiResponse';
import { IParamGetAllClinicForPatient } from '@/types/paramTypes';

export async function getAllClinicsForPatient(
  params: IParamGetAllClinicForPatient
) {
  return await get<IGetAllClinicForPatientResponse>('/patient/clinic', {
    params,
  });
}

export async function getClinicByIdForPatient(id: string) {
  return await get<IGetClinicByIdForPatientResponse>(
    '/patient/clinic/' + id
  ).then((res) => res.data);
}

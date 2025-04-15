import { get } from '@/app/api/api';
import {
  IGetAllClinicForPatientResponse,
  IGetClinicByIdForPatientResponse,
} from '@/types/ApiResponse';
import { IParamGetAllClinic } from '@/types/paramTypes';

export async function getAllClinics(params: IParamGetAllClinic) {
  const url = `${params.role}/clinic`;
  return await get<IGetAllClinicForPatientResponse>(url, {
    params,
  });
}

export async function getClinicByIdForPatient(id: string) {
  return await get<IGetClinicByIdForPatientResponse>(
    '/patient/clinic/' + id
  ).then((res) => res.data);
}

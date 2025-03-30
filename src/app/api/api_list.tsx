import { ResponseAPI } from "@/types";
import { get } from "./api";

export const apiList = {
  async patients(params?: any) {
    return await get<ResponseAPI>('/admin/patient', {
      params: {
        ...params
      }
    })
  },
  async doctors(params?: any) {
    return await get<ResponseAPI>('/admin/doctor', {
      params: {
        ...params
      }
    })
  },
  async appointments(params?: any) {
    return await get<ResponseAPI>('/admin/appointment', {
      params: {
        ...params
      }
    })
  },
  async invoices(params?: any) {
    return await get<ResponseAPI>('/admin/invoice', {
      params: {
        ...params
      }
    })
  },
  async users(params?: any) {
    return await get<ResponseAPI>('/admin/user', {
      params: {
        ...params
      }
    })
  },
}
import {
  deleteEmailTemplate,
  deleteSmsTemplate,
  getEmailTemplates,
  getSmsTemplates,
  postEmailTemplate,
  postSmsTemplate,
  putEmailTemplate,
  putSmsTemplate,
} from '@/service/template';
import {
  IParamGetAllEmailTemplates,
  IParamGetAllSmsTemplates,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetEmailTemplates(params: IParamGetAllEmailTemplates) {
  return useQuery({
    queryKey: ['emailTemplates'],
    queryFn: () => getEmailTemplates(params),
  });
}

export function useGetSmsTemplates(params: IParamGetAllSmsTemplates) {
  return useQuery({
    queryKey: ['smsTemplates'],
    queryFn: () => getSmsTemplates(params),
  });
}

export function usePostCreateEmailTemplate() {
  return useMutation({ mutationFn: postEmailTemplate });
}

export function usePutUpdateEmailTemplate() {
  return useMutation({ mutationFn: putEmailTemplate });
}

export function usePostCreateSmsTemplate() {
  return useMutation({ mutationFn: postSmsTemplate });
}

export function usePutUpdateSmsTemplate() {
  return useMutation({ mutationFn: putSmsTemplate });
}

export function useDeleteEmailTemplate() {
  return useMutation({ mutationFn: deleteEmailTemplate });
}

export function useDeleteSmsTemplate() {
  return useMutation({ mutationFn: deleteSmsTemplate });
}

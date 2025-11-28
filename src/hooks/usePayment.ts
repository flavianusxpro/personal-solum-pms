import { getPaymentConfiguration, putPaymentConfiguration } from "@/service/payment";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAllPaymentConfigurations(params: any) {
  return useQuery({
    queryKey: ['payment-configuration' + params],
    queryFn: async () => getPaymentConfiguration(params),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useUpdatePaymentConfiguration() {
    return useMutation({
        mutationFn: async (payload: any) => {
            return await putPaymentConfiguration(payload);
        },
    });
}
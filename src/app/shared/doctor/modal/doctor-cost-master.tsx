import { Form } from '@/core/ui/form';
import {
  useGetDoctorCostById,
  useGetTreatments,
  useGetTreatmentsFromMaster,
  usePostCreateDoctorCost,
  usePutUpdateDoctorCost,
} from '@/hooks/useDoctor';
import { SettingsDoctorSchema } from '@/validators/settings-doctor.schema';
import { useMemo } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { ActionIcon, Flex, Input, Title } from 'rizzui';
import { z } from 'zod';
import CSelect from '../../ui/select';
import FormHeader from '@/core/components/form-header';
import FormFooter from '@/core/components/form-footer';
import { useAtom } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { IPayloadDoctorCost } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';

const costSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
  treatmentId: z.number().min(1, {
    message: 'Treatment is required',
  }),
});

type IProps = {
  id?: number;
};

export default function DoctorCostMaster() {
  const doctorId = useParams().id as unknown as number;
  const { closeModal } = useModal();

  const [currency] = useAtom(currencyAtom);

  const { data: dataTreatments } = useGetTreatmentsFromMaster(doctorId);

  return (
    <div className="space-y-6">
      <Flex
        className="rounded-t-lg bg-white px-6 py-4"
        justify="between"
        align="center"
        gap="4"
      >
        <Title className="text-lg">Treatment Cost From Master</Title>
        <ActionIcon variant="text" onClick={closeModal} className="">
          <PiX className="h-6 w-6" />
        </ActionIcon>
      </Flex>
      {/* Simple Table */}
      <div className="p-4">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Treatment Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Currency
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataTreatments?.data?.map((treatment, index) => (
                <tr key={treatment.id || index} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {treatment.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {treatment.amount || '0.00'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {currency?.active?.code || 'USD'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {(!dataTreatments?.data || dataTreatments.data.length === 0) && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No treatments found</p>
                <p className="text-sm">Add some treatments to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

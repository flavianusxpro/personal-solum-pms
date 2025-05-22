import { Form } from '@/core/ui/form';
import {
  useGetDoctorCostById,
  useGetTreatments,
  usePostCreateDoctorCost,
  usePutUpdateDoctorCost,
} from '@/hooks/useDoctor';
import { SettingsDoctorSchema } from '@/validators/settings-doctor.schema';
import { useMemo } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Input } from 'rizzui';
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

const costSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
  treatmentId: z.number().min(1, {
    message: 'Treatment is required',
  }),
});

type IProps = {
  id?: number;
  amount?: string;
  treatmentId?: number;
};

export default function DoctorCost(data: IProps) {
  const { id } = data;
  const doctorId = useParams().id as unknown as number;
  const { closeModal } = useModal();

  const [currency] = useAtom(currencyAtom);

  const { refetch } = useGetDoctorCostById(doctorId);
  const { data: dataTreatments } = useGetTreatments({
    page: 1,
    perPage: 100,
  });

  const { mutate: mutateCreate } = usePostCreateDoctorCost();
  const { mutate: mutateUpdate } = usePutUpdateDoctorCost();

  const treatmentOptions = useMemo(() => {
    if (!dataTreatments) return [];
    return dataTreatments.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [dataTreatments]);

  const onSubmit: SubmitHandler<SettingsDoctorSchema['costs'][number]> = (
    data
  ) => {
    console.log('🚀 ~ DoctorCost ~ data:', data);
    const payload: IPayloadDoctorCost = {
      id,
      doctorId,
      treatmentId: data.treatmentId,
      amount: Number(data.amount),
    };
    if (id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          toast.success('Treatment cost updated successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error updating treatment cost'
          );
        },
      });
    } else {
      mutateCreate(payload, {
        onSuccess: () => {
          refetch();
          toast.success('Treatment cost created successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error creating treatment cost'
          );
        },
      });
    }
  };

  return (
    <Form<SettingsDoctorSchema['costs'][number]>
      validationSchema={costSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="max-h-[90vh] overflow-y-auto rounded-xl bg-white @container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          amount: Number(data?.amount).toString(),
          treatmentId: data?.treatmentId,
        },
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 pt-2">
            <FormHeader title={`${id ? 'Edit' : 'Create'} Treatment Cost`} />

            <div className="grid grid-cols-1 gap-x-7 gap-y-4 px-6">
              <Controller
                name={`treatmentId`}
                control={control}
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Treatment"
                    placeholder="Select Treatment"
                    error={
                      errors?.treatmentId?.message && 'Treatment is required'
                    }
                    options={treatmentOptions}
                  />
                )}
              />
              <Input
                {...register(`amount`, {
                  required: 'Amount is required',
                })}
                prefix={`${currency.active.symbol}`}
                label="Amount"
                placeholder="Enter Amount"
                error={errors?.amount?.message}
                className="w-full"
                type="number"
              />
            </div>
            <FormFooter
              className="rounded-b-xl"
              //   isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </div>
        );
      }}
    </Form>
  );
}

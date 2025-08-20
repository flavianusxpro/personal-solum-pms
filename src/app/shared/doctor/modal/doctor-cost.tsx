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

const costSchema = z
  .object({
    amount: z.string().min(1, { message: 'Amount is required' }),
    treatmentId: z.number().min(1, {
      message: 'Treatment is required',
    }),
    amount_moderated: z
      .string()
      .min(1, { message: 'Amount Moderated is required' }),
  })
  .refine(
    (data) => {
      if (!data.amount || !data.amount_moderated) return true;

      const amountNum = parseFloat(data.amount);
      const moderatedNum = parseFloat(data.amount_moderated);

      if (isNaN(amountNum) || isNaN(moderatedNum)) return true;

      return moderatedNum >= amountNum;
    },
    {
      message: 'Amount Moderated must be greater than or equal to Amount',
      path: ['amount_moderated'],
    }
  );

type IProps = {
  id?: number;
  amount?: string;
  treatmentId?: number;
  amount_moderated?: string;
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
    doctorId,
  });
  const { data: dataDoctorCost, refetch: refetchDoctorCost } =
    useGetDoctorCostById(doctorId as unknown as number);

  const { mutate: mutateCreate } = usePostCreateDoctorCost();
  const { mutate: mutateUpdate } = usePutUpdateDoctorCost();

  const treatmentOptions = useMemo(() => {
    if (!dataTreatments) return [];
    const existingTreatments = dataDoctorCost?.data || [];
    const existingTreatmentIds = new Set(
      existingTreatments.map((treatment) => treatment.treatmentId)
    );

    return dataTreatments.data
      .filter(
        (item) =>
          !existingTreatmentIds.has(item.id) || data.treatmentId === item.id
      )
      .map((item) => ({
        label: item.name,
        value: item.id,
      }));
  }, [data.treatmentId, dataDoctorCost?.data, dataTreatments]);

  const onSubmit: SubmitHandler<SettingsDoctorSchema['costs'][number]> = (
    data
  ) => {
    const payload: IPayloadDoctorCost = {
      id,
      doctorId,
      treatmentId: data.treatmentId,
      amount: Number(data.amount_moderated),
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
          amount_moderated: Number(data?.amount_moderated).toString(),
        },
      }}
    >
      {({ register, control, setValue, formState: { errors } }) => {
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
                    onChange={(value) => {
                      field.onChange(value);
                      setValue(
                        'amount',
                        dataTreatments?.data.find((item) => item.id === value)
                          ?.amount || ''
                      );
                    }}
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
                {...register(`amount`)}
                prefix={`${currency.active.symbol}`}
                label="Amount"
                placeholder="Enter Amount"
                error={errors?.amount?.message}
                className="w-full"
                type="number"
                disabled={true}
              />
              <Input
                {...register(`amount_moderated`, {
                  required: 'Amount Moderated is required',
                })}
                prefix={`${currency.active.symbol}`}
                label="Amount Moderated"
                placeholder="Enter Amount Moderated"
                error={errors?.amount_moderated?.message}
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

import { IGetProfileResponse } from '@/types/ApiResponse';
import {
  ExistingPatientSchema,
  existingPatientSchema,
} from '@/validators/existing-patient.schema';
import { Form } from '@core/ui/form';
import { Button, Input } from 'rizzui';

interface ExistingPatientFormProps {
  onSubmitPatient: (data: ExistingPatientSchema) => void;
  dataProfile?: IGetProfileResponse['data'];
}

export default function ExistingPatient({
  onSubmitPatient,
  dataProfile,
}: ExistingPatientFormProps) {
  const defaultValues: Partial<ExistingPatientSchema> = {
    patientFirstName: dataProfile?.first_name ?? '',
    patientLastName: dataProfile?.last_name ?? '',
    patienDateBirth: dataProfile?.date_of_birth ?? '',
    patientMobilePhone: dataProfile?.mobile_number ?? '',
  };

  return (
    <>
      <h3 className="text-lg font-semibold">Add Patient Information</h3>
      <p className="text-sm text-gray-500">
        Fill in the details of the patient who is attending this appointment.
      </p>
      <Form<ExistingPatientSchema>
        validationSchema={existingPatientSchema}
        onSubmit={onSubmitPatient}
        useFormProps={{
          mode: 'onChange',
          defaultValues,
        }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <div className="mt-4 space-y-4">
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    className="group relative z-0 w-full"
                    aria-required={true}
                    {...register('patientFirstName')}
                    error={errors.patientFirstName?.message as string}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    className="group relative z-0 w-full"
                    {...register('patientLastName')}
                    error={errors.patientLastName?.message as string}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    className="group relative z-0 w-full"
                    type="date"
                    {...register('patienDateBirth')}
                    error={errors.patienDateBirth?.message as string}
                  />
                  <Input
                    label="Mobile Phone"
                    placeholder="Mobile Phone"
                    className="group relative z-0 w-full"
                    type="number"
                    {...register('patientMobilePhone')}
                    error={errors.patientMobilePhone?.message as string}
                  />
                </div>
              </div>

              <Button
                className="mt-4 w-full bg-green-600 text-white"
                type="submit"
              >
                Next
              </Button>
            </>
          );
        }}
      </Form>
    </>
  );
}

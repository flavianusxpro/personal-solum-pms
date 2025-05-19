import { Flex, Grid, Input, Switch } from 'rizzui';
import FormGroup from '../../ui/form-group';
import { Form } from '@/core/ui/form';
import { Controller, SubmitHandler } from 'react-hook-form';
import {
  SettingsDoctorSchema,
  settingsDoctorSchema,
} from '@/validators/settings-doctor.schema';
import FormFooter from '@/core/components/form-footer';
import CNumberInput from '@/core/ui/number-input';
import {
  useUpdateSettingBillingDoctor,
  useUpdateSettingMeetingDoctor,
} from '@/hooks/useDoctor';
import { useParams } from 'next/navigation';
import {
  IPayloadSettingBillingDoctor,
  IPayloadSettingMeetingDoctor,
} from '@/types/paramTypes';
import toast from 'react-hot-toast';

export default function TabSpecialist({}: {}) {
  const isView = false;
  const id = useParams().id as string;

  const { mutate: mutateUpdateMeeting, isPending: isPendingUpdateMeeting } =
    useUpdateSettingMeetingDoctor();
  const { mutate: mutateUpdateBilling, isPending: isPendingUpdateBillig } =
    useUpdateSettingBillingDoctor();

  const onSubmit: SubmitHandler<SettingsDoctorSchema> = (data) => {
    console.log('🚀 ~ TabSettings ~ data:', data);
    const payloadSettingMeeting: IPayloadSettingMeetingDoctor = {
      doctor_id: id,
      microsoft_team_link: data.microsoft_team_link,
      microsoft_team_id: data.microsoft_team_id,
      microsoft_team_passcode: data.microsoft_team_passcode,
      zoom_meeting_link: data.zoom_meeting_link,
      zoom_meeting_id: data.zoom_meeting_id,
      zoom_meeting_passcode: data.zoom_meeting_passcode,
      // skype: data.skype,
      // f2f: data.f2f ? 1 : 0,
      // teleHealth: data.teleHealth ? 1 : 0,
    };
    const payloadSettingBilling: IPayloadSettingBillingDoctor = {
      doctor_id: id,
      fee: data.fee,
      cancellation_fee: data.cancellation_fee,
      initial_appointment_fee: data.initial_appointment_fee,
      followup_appointment_fee: data.follow_up_appointment_fee,
    };

    mutateUpdateMeeting(payloadSettingMeeting, {
      onSuccess: () => {
        toast.success('Meeting settings updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Error updating meeting settings: ' + error.response.data.message
        );
      },
    });

    mutateUpdateBilling(payloadSettingBilling, {
      onSuccess: () => {
        toast.success('Billing settings updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Error updating billing settings: ' + error.response.data.message
        );
      },
    });
  };

  return (
    <div>
      <Form<SettingsDoctorSchema>
        validationSchema={settingsDoctorSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
        }}
      >
        {({
          register,
          control,
          setValue,
          getValues,
          formState: { errors },
        }) => {
          return (
            <>
              <div className="mb-4 flex flex-col gap-7">
                <FormGroup title="Settings" />
                <FormGroup title="Meeting Type">
                  <Flex gap="4">
                    <Input
                      {...register('microsoft_team_link')}
                      label="Teams Link"
                      placeholder="Teams Link"
                      error={errors.microsoft_team_link?.message}
                      className="w-full"
                      type="url"
                      disabled={isView}
                    />
                    <Input
                      {...register('microsoft_team_id')}
                      label="Teams ID"
                      placeholder="Teams ID"
                      error={errors.microsoft_team_id?.message}
                      className="w-full"
                      disabled={isView}
                    />
                    <Input
                      {...register('microsoft_team_passcode')}
                      label="Teams Passcode"
                      placeholder="Teams Passcode"
                      error={errors.microsoft_team_passcode?.message}
                      className="w-full"
                      disabled={isView}
                    />
                  </Flex>

                  <Flex gap="4">
                    <Input
                      {...register('zoom_meeting_link')}
                      label="Zoom"
                      placeholder="Zoom"
                      error={errors.zoom_meeting_link?.message}
                      className="w-full"
                      type="url"
                      disabled={isView}
                    />
                    <Input
                      {...register('zoom_meeting_id')}
                      label="Zoom ID"
                      placeholder="Zoom ID"
                      error={errors.zoom_meeting_id?.message}
                      className="w-full"
                      disabled={isView}
                    />
                    <Input
                      {...register('zoom_meeting_passcode')}
                      label="Zoom Passcode"
                      placeholder="Zoom Passcode"
                      error={errors.zoom_meeting_passcode?.message}
                      className="w-full"
                      disabled={isView}
                    />
                  </Flex>

                  <Switch
                    label="Face to Face"
                    {...register('f2f')}
                    checked={getValues('f2f')}
                    onChange={(e) => {
                      setValue('f2f', e.target.checked);
                    }}
                    error={errors.f2f?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Switch
                    label="Tele Health"
                    {...register('teleHealth')}
                    checked={getValues('teleHealth')}
                    onChange={(e) => {
                      setValue('teleHealth', e.target.checked);
                    }}
                    error={errors.teleHealth?.message}
                    className="w-full"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Cost Setup">
                  <Grid columns="2">
                    <Controller
                      name="fee"
                      control={control}
                      render={({ field }) => (
                        <CNumberInput
                          {...field}
                          label="Fee"
                          placeholder="Fee"
                          error={errors.fee?.message}
                          disabled={isView}
                        />
                      )}
                    />
                    <Controller
                      name="cancellation_fee"
                      control={control}
                      render={({ field }) => (
                        <CNumberInput
                          {...field}
                          label="Cancellation Fee"
                          placeholder="Cancellation Fee"
                          error={errors.cancellation_fee?.message}
                          disabled={isView}
                        />
                      )}
                    />
                    <Controller
                      name="initial_appointment_fee"
                      control={control}
                      render={({ field }) => (
                        <CNumberInput
                          {...field}
                          label="Initial Appointment Fee"
                          placeholder="Initial Appointment Fee"
                          error={errors.initial_appointment_fee?.message}
                          disabled={isView}
                        />
                      )}
                    />
                    <Controller
                      name="follow_up_appointment_fee"
                      control={control}
                      render={({ field }) => (
                        <CNumberInput
                          {...field}
                          label="Follow Up Appointment Fee"
                          placeholder="Follow Up Appointment Fee"
                          error={errors.follow_up_appointment_fee?.message}
                          disabled={isView}
                        />
                      )}
                    />
                  </Grid>
                </FormGroup>
              </div>
              <FormFooter
                isLoading={isPendingUpdateMeeting || isPendingUpdateBillig}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            </>
          );
        }}
      </Form>
    </div>
  );
}

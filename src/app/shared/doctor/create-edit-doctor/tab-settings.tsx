import { Accordion, cn, Flex, Grid, Input, Switch, Text, Title } from 'rizzui';
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
  useGetDoctorById,
  useUpdateSettingBillingDoctor,
  useUpdateSettingMeetingDoctor,
} from '@/hooks/useDoctor';
import { useParams } from 'next/navigation';
import {
  IPayloadSettingBillingDoctor,
  IPayloadSettingMeetingDoctor,
} from '@/types/paramTypes';
import toast from 'react-hot-toast';
import CSelect from '../../ui/select';
import { timeZoneOption } from '@/config/constants';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import TeamsIcon from '@core/components/icons/teams';
import Divider from '../../ui/divider';

export default function TabSettings({ isView = false }: { isView?: boolean }) {
  const id = useParams().id as string;

  const { data: dataDoctor, refetch: refetchDataDoctor } = useGetDoctorById(id);

  const { mutate: mutateUpdateMeeting, isPending: isPendingUpdateMeeting } =
    useUpdateSettingMeetingDoctor();
  const { mutate: mutateUpdateBilling, isPending: isPendingUpdateBillig } =
    useUpdateSettingBillingDoctor();

  const onSubmit: SubmitHandler<SettingsDoctorSchema> = (data) => {
    const payloadSettingMeeting: IPayloadSettingMeetingDoctor = {
      doctor_id: id,
      microsoft_team_link: data.microsoft_team_link,
      microsoft_team_id: data.microsoft_team_id,
      microsoft_team_passcode: data.microsoft_team_passcode,
      microsoft_team_status: data.microsoft_team_status,
      zoom_meeting_link: data.zoom_meeting_link,
      zoom_meeting_id: data.zoom_meeting_id,
      zoom_meeting_passcode: data.zoom_meeting_passcode,
      zoom_meeting_status: data.zoom_meeting_status,
      skype_meeting_link: data.skype_link,
      skype_meeting_id: data.skype_meeting_id,
      skype_meeting_passcode: data.skype_meeting_passcode,
      skype_meeting_status: data.skype_meeting_status,
      f2f_meeting_status: data.f2f,
      telehealth_meeting_status: data.teleHealth,
      initial_appointment_time: data.initial_appointment_time,
      follow_up_appointment_time: data.follow_up_appointment_time,
      timeZone: data.doctor_timezone,
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
        refetchDataDoctor();
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
        refetchDataDoctor();
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
          mode: 'all',
          defaultValues: {
            microsoft_team_link: dataDoctor?.setting?.microsoft_team_link || '',
            microsoft_team_id: dataDoctor?.setting?.microsoft_team_id || '',
            microsoft_team_passcode:
              dataDoctor?.setting?.microsoft_team_passcode || '',
            microsoft_team_status: dataDoctor?.setting.microsoft_team_status,
            zoom_meeting_link: dataDoctor?.setting?.zoom_meeting_link || '',
            zoom_meeting_id: dataDoctor?.setting?.zoom_meeting_id || '',
            zoom_meeting_passcode:
              dataDoctor?.setting?.zoom_meeting_passcode || '',
            zoom_meeting_status: dataDoctor?.setting?.zoom_meeting_status,
            skype_link: dataDoctor?.setting?.skype_meeting_link || '',
            skype_meeting_id: dataDoctor?.setting?.skype_meeting_id || '',
            skype_meeting_passcode:
              dataDoctor?.setting?.skype_meeting_passcode || '',
            skype_meeting_status: dataDoctor?.setting?.skype_meeting_status,
            f2f: dataDoctor?.setting?.f2f_meeting_status,
            teleHealth: dataDoctor?.setting?.telehealth_meeting_status,
            // field1: dataDoctor?.setting?.field1 || '',
            // field2: dataDoctor?.setting?.field2 || '',
            // field3: dataDoctor?.setting?.field3 || '',
            // field4: dataDoctor?.setting?.field4 || '',
            fee: dataDoctor?.setting?.fee || 0,
            cancellation_fee: dataDoctor?.setting?.cancellation_fee || 0,
            initial_appointment_fee:
              Number(dataDoctor?.setting?.initial_appointment_fee) || 0,
            follow_up_appointment_fee:
              Number(dataDoctor?.setting?.followup_appointment_fee) || 0,
            // doctor_timezone: dataDoctor?.setting.doctor_timezone,
            follow_up_appointment_time:
              dataDoctor?.setting?.followup_appointment_time,
            initial_appointment_time:
              dataDoctor?.setting?.initial_appointment_time,
            // academic_degree: dataDoctor?.setting?.academic_degree || '',
            // fellowship: dataDoctor?.setting?.fellowship || '',
            // certificate: dataDoctor?.setting?.certificate || '',
            // other_qualification:
            //   dataDoctor?.setting?.other_qualification || '',
          },
        }}
      >
        {({ register, control, setValue, watch, formState: { errors } }) => {
          return (
            <>
              <div className="section-container mb-4">
                <FormGroup title="Settings" />
                <MeetingCard
                  icon={<TeamsIcon />}
                  meetName="Microsoft Teams"
                  content="Microsoft Teams Meeting Link"
                  switchValue={watch('microsoft_team_status')}
                  onSwitchChange={(checked) => {
                    setValue('microsoft_team_status', checked);
                  }}
                >
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
                </MeetingCard>

                <MeetingCard
                  icon={<IoChevronDownCircleOutline />}
                  meetName="Zoom"
                  content="Zoom Meeting Link"
                  switchValue={watch('zoom_meeting_status')}
                  onSwitchChange={(checked) => {
                    setValue('zoom_meeting_status', checked);
                  }}
                >
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
                </MeetingCard>

                <MeetingCard
                  icon={<IoChevronDownCircleOutline />}
                  meetName="Skype"
                  content="Skype Meeting Link"
                  switchValue={watch('skype_meeting_status')}
                  onSwitchChange={(checked) => {
                    setValue('skype_meeting_status', checked);
                  }}
                >
                  <Flex gap="4">
                    <Input
                      {...register('skype_link')}
                      label="Skype Link"
                      placeholder="Skype Link"
                      error={errors.skype_link?.message}
                      className="w-full"
                      type="url"
                      disabled={isView}
                    />
                    <Input
                      {...register('skype_meeting_id')}
                      label="Skype ID"
                      placeholder="Skype ID"
                      error={errors.skype_meeting_id?.message}
                      className="w-full"
                      disabled={isView}
                    />
                    <Input
                      {...register('skype_meeting_passcode')}
                      label="Skype Passcode"
                      placeholder="Skype Passcode"
                      error={errors.skype_meeting_passcode?.message}
                      className="w-full"
                      disabled={isView}
                    />
                  </Flex>
                </MeetingCard>

                <MeetingCard
                  icon={<IoChevronDownCircleOutline />}
                  meetName="Face to Face"
                  content="Face to Face"
                  useConfigure={false}
                  onSwitchChange={(checked) => {
                    setValue('f2f', checked);
                  }}
                  switchValue={watch('f2f')}
                >
                  <></>
                </MeetingCard>

                <MeetingCard
                  icon={<IoChevronDownCircleOutline />}
                  meetName="Tele Health"
                  content="Tele Health"
                  useConfigure={false}
                  onSwitchChange={(checked) => {
                    setValue('teleHealth', checked);
                  }}
                  switchValue={watch('teleHealth')}
                >
                  <></>
                </MeetingCard>

                <Divider className="" />

                <FormGroup title="Qualification">
                  <Input
                    {...register('academic_degree')}
                    label="Academic Degree"
                    placeholder="Enter your academic degree (e.g., MBBS, MD)"
                    error={errors.academic_degree?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Input
                    {...register('fellowship')}
                    label="Fellowship"
                    placeholder="Enter your fellowship qualification (e.g., FRACGP)"
                    error={errors.fellowship?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Input
                    {...register('certificate')}
                    label="Certificate / Diploma"
                    placeholder="Enter any certificates or diplomas (e.g., DCH)"
                    error={errors.certificate?.message}
                    className="w-full"
                    disabled={isView}
                  />
                  <Input
                    {...register('other_qualification')}
                    label="Other Qualifications"
                    placeholder="Enter other qualifications (e.g., BioMed, MSc)"
                    error={errors.other_qualification?.message}
                    className="w-full"
                    disabled={isView}
                  />
                </FormGroup>

                <Divider className="" />

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

                <Divider className="" />

                <FormGroup title="Time">
                  <Grid columns="2">
                    <Controller
                      name="doctor_timezone"
                      control={control}
                      render={({ field }) => (
                        <CSelect
                          {...field}
                          label="Time Zone"
                          placeholder="Select Time Zone"
                          error={errors.doctor_timezone?.message}
                          disabled={isView}
                          options={timeZoneOption}
                        />
                      )}
                    />
                    <Controller
                      name="initial_appointment_time"
                      control={control}
                      render={({ field }) => (
                        <CSelect
                          {...field}
                          label="Initial Appointment Duration"
                          placeholder="Select Initial Appointment Duration"
                          error={errors.initial_appointment_time?.message}
                          disabled={isView}
                          options={[
                            { label: '15 minutes', value: 15 },
                            { label: '30 minutes', value: 30 },
                            { label: '45 minutes', value: 45 },
                            { label: '60 minutes', value: 60 },
                          ]}
                        />
                      )}
                    />
                    <Controller
                      name="follow_up_appointment_time"
                      control={control}
                      render={({ field }) => (
                        <CSelect
                          {...field}
                          label="Follow Up Appointment Duration"
                          placeholder="Select Follow Up Appointment Duration"
                          error={errors.follow_up_appointment_time?.message}
                          disabled={isView}
                          options={[
                            { label: '15 minutes', value: 15 },
                            { label: '30 minutes', value: 30 },
                            { label: '45 minutes', value: 45 },
                            { label: '60 minutes', value: 60 },
                          ]}
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

interface IMeetingCard {
  icon: React.ReactNode;
  meetName: string;
  content: string;
  children: React.ReactNode;
  useConfigure?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  switchValue?: boolean;
}
function MeetingCard(props: IMeetingCard) {
  const {
    icon,
    meetName,
    content,
    children,
    useConfigure = true,
    onSwitchChange,
    switchValue = false,
  } = props;

  return (
    <div className="col-span-2 flex gap-3 rounded-lg border border-muted p-6">
      <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden">
        {icon}
      </div>
      <div className="flex flex-grow flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Title as="h3" className="mb-1 text-base font-semibold">
            {meetName}
          </Title>
          <Text className="text-sm text-gray-500 transition-colors">
            {content}
          </Text>
          <Accordion>
            {useConfigure && (
              <Accordion.Header className="text-left" type="button">
                {({ open }) => (
                  <span className="mt-3 inline-block w-auto flex-shrink-0 justify-start p-0 text-xs font-medium capitalize text-gray-900">
                    Configure
                  </span>
                )}
              </Accordion.Header>
            )}

            <Accordion.Body className="pt-7">{children}</Accordion.Body>
          </Accordion>
        </div>
      </div>
      <Switch
        checked={switchValue}
        onChange={(e) => onSwitchChange?.(e.target.checked)}
        variant="flat"
      />
    </div>
  );
}

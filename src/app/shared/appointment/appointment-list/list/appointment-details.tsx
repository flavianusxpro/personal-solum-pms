import { useModal } from '@/app/shared/modal-views/use-modal';
import dayjs from '@/config/dayjs';
import {
  PiBriefcase,
  PiCopy,
  PiEnvelope,
  PiPhone,
  PiXBold,
} from 'react-icons/pi';
import { ActionIcon, Title, Avatar, Flex, Badge, Text, Button, Textarea } from 'rizzui';
import { useCopyToClipboard } from 'react-use';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAptStatusBadge } from './columns';

export default function AppointmentDetails({
  data,
  onEdit,
}: {
  data?: any;
  onEdit?: () => void;
}) {
  const { closeModal } = useModal();
  const [state, copyToClipboard] = useCopyToClipboard();
  const handleCopy = (text: string | number) => {
    copyToClipboard(String(text));
  };

  useEffect(() => {
    if (state.error) {
      console.error('Failed to copy: ', state.error);
    } else if (state.value) {
      toast.success('Copied to clipboard');
    }
  }, [state]);

  const getPaymentStatusBadge = (status: number | string | undefined) => {
    switch (status) {
      case 1:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-[#484848]' renderAsDot />
            <Text className="font-medium text-[#484848]">Draft</Text>
          </Flex>
        );
      case 2:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-[#11833C]' renderAsDot />
            <Text className="font-medium text-[#11833C]">
              Paid
            </Text>
          </Flex>
        );
      case 3:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-[#E90000]' renderAsDot />
            <Text className="font-medium text-[#E90000]">
              Cancelled
            </Text>
          </Flex>
        );
      case 4:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-[#F4A523]' renderAsDot />
            <Text className="font-medium bg-[#F4A523]">Void</Text>
          </Flex>
        );
      case 5:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-[#AB570A]' renderAsDot />
            <Text className="font-medium text-[#AB570A]">Refund</Text>
          </Flex>
        );
      case 6:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-[#1E88E5]' renderAsDot />
            <Text className="font-medium text-[#1E88E5]">Unpaid</Text>
          </Flex>
        );
      default:
        return (
          <div className="flex items-center">
            <Badge renderAsDot className="bg-gray-600" />
            <Text className="font-medium text-gray-600">Not Paid</Text>
          </div>
        );
    }
  }

  const getAptType = (type: string) => {
    const colorMap: Record<string, string> = {
      "Initial Consult": "#1FA551",
      "Follow Up": "#0078D7",
      "Transfer": "#F4A523",
      "Reschedule": "#E84757",
    };

    const text = type || "Unknown";
    const dotColor = colorMap[type] || "#999999";

    return (
      <Flex gap="1" align="center">
        <Badge style={{ backgroundColor: dotColor }} renderAsDot />
        <Text className="font-medium" style={{ color: dotColor }}>
          {text}
        </Text>
      </Flex>
    );
  };

  return (
    <div className="flex w-full flex-col bg-white rounded-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-10 py-5">
        <Title as="h3" className="text-lg font-semibold">
          Appointment Details
        </Title>
        <ActionIcon
          variant="text"
          onClick={closeModal}
          className="hover:bg-gray-100"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="p-10">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Doctor Info */}
          <div className='hidden md:block border-r boder-[#E4E4E4]'>
            <h4 className="mb-4 text-[16px] font-medium">Doctor Info</h4>
            <div className="flex items-center justify-center gap-4">
              <Avatar
                name={`${data?.doctor?.first_name} ${data?.doctor?.last_name}`}
                src={
                  data?.doctor?.photo ||
                  `${data?.doctor?.first_name} ${data?.doctor?.last_name}`
                }
                className="!h-[80px] !w-[80px] text-xl text-white font-semibold"
              />

              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <h5 className="text-lg font-semibold">
                    Dr. {data?.doctor?.first_name} {data?.doctor?.last_name}
                  </h5>
                  <span className="rounded-[4px] border border-[#E4E4E4] px-[8px] py-[4px] text-xs text-[#999999]">
                    {data?.doctor?.specialists?.[0].name ?? '-'}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <PiEnvelope className="text-[18px]" />
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-[#525252]">
                        {data?.doctor?.email ?? '-'}
                      </p>
                      <PiCopy
                        onClick={() =>
                          handleCopy(data?.doctor?.email)
                        }
                        className="cursor-pointer active:scale-[0.99]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiPhone className="text-[18px]" />
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-[#525252]">
                        {data?.doctor?.mobile_number ?? '-'}
                      </p>
                      <PiCopy
                        onClick={() => handleCopy(data?.doctor?.mobile_number)}
                        className="cursor-pointer active:scale-[0.99]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div>
            <h4 className="mb-4 text-[16px] font-medium">Patient Info</h4>
            <div className="flex items-center justify-center gap-4">
              <Avatar
                name={`${data?.patient?.first_name} ${data?.patient?.last_name}`}
                src={
                  data?.patient?.photo ||
                  `${data?.patient?.first_name} ${data?.patient?.last_name}`
                }
                className="!h-[80px] !w-[80px] text-xl text-white font-semibold"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <h5 className="flex items-center gap-4">
                    {data?.patient?.first_name}{' '}
                    {data?.patient?.last_name}
                  </h5>
                  <span className="rounded-[4px] border border-[#E4E4E4] px-[8px] py-[4px] text-xs text-[#999999]">
                    {data?.patient?.gender
                      ? (data?.patient?.gender).charAt(0).toUpperCase() +
                      (data?.patient?.gender).substr(1).toLowerCase()
                      : '-'}
                    , {data?.patient?.age ?? '-'} y.o.
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <PiEnvelope className="text-[18px]" />
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-[#525252]">
                        {data?.patient?.email ?? '-'}
                      </p>
                      <PiCopy
                        onClick={() => handleCopy(data?.patient?.email)}
                        className="cursor-pointer active:scale-[0.99]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiPhone className="text-[18px]" />
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-[#525252]">
                        {data?.patient?.mobile_number ?? '-'}
                      </p>
                      <PiCopy
                        onClick={() => handleCopy(data?.patient?.mobile_number)}
                        className="cursor-pointer active:scale-[0.99]"
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-2 flex gap-2'>
                  <Link
                    href={routes.patient.patientDetail(data?.patient?.patient_id.toString())}
                  >
                    <Button
                      size='sm'
                      className="!bg-[#3872F9] text-[16px] font-semibold"
                    >
                      Go to Profile
                    </Button>
                  </Link>
                  <Link
                    href={routes.patient.edit(data?.patient?.patient_id.toString())}
                  >
                    <Button
                      size='sm'
                      variant='outline'
                      className="text-[16px] font-semibold"
                    >
                      Edit Patient
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="mb-4 rounded-[8px] border border-[#E4E4E4] p-4">
          <h3 className="mb-4 text-sm font-semibold text-[#525252]">
            Appointment Info
          </h3>
          <div className="grid grid-cols-3">
            <div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-[#525252]">Date:</span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">
                    {dayjs(data?.date).utc().format('DD MMM YYYY')},{' '}
                    {dayjs(data?.date).utc().format('hh:mm A')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-[#525252]">Type:</span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">{getAptType(data?.type ?? '')}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-[#525252]">Last Appointment:</span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">
                    {data?.patient?.last_appointment ? `${dayjs(data?.patient?.last_appointment?.date).utc().format('DD MMM YYYY')}, ${dayjs(data?.patient?.last_appointment?.date).utc().format('hh:mm A')}` : 'None'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-[#525252]">Payment Status:</span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">
                    {getPaymentStatusBadge(data?.payment?.status ?? 0)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-[#525252]">Invoice Number:</span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">
                    {data?.payment?.invoice ?? '-'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-[#525252]">Status:</span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">
                    {getAptStatusBadge(data?.payment?.status ?? '')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-[8px] border border-[#E4E4E4] p-4">
          <h3 className="mb-4 text-sm font-semibold text-[#525252]">
            Add Notes
          </h3>
          <Textarea placeholder="Enter another notes" />
        </div>

        {/* Patient Notes */}
        <div className="mb-4 rounded-[8px] border border-[#E4E4E4] p-4">
          <h3 className="mb-4 text-sm font-semibold text-[#525252]">
            Notes
          </h3>
          <p className="text-sm text-[#444444]">{data?.note ?? '-'}</p>
        </div>

        {/* Patient Symptom and Medications History */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Patient Symptom History */}
          <div className="mb-[16px] rounded-[8px] border border-[#E4E4E4] p-[16px]">
            <h3 className="mb-4 text-sm font-semibold text-[#525252]">
              Patient Symptom History
            </h3>

            {!data?.patient?.last_appointment ? (
              <div className='text-sm'>
                <p className='text-[#444444]'>None</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Symptom:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      Fever
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Start Date:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      27 Jul 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Severity:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      Moderate
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Duration:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      3 Days
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medications History */}
          <div className="mb-[16px] rounded-[8px] border border-[#E4E4E4] p-[16px]">
            <h3 className="mb-4 text-sm font-semibold text-[#525252]">
              Medications History
            </h3>

            {!data?.patient?.last_appointment ? (
              <div className='text-sm'>
                <p className='text-[#444444]'>None</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Drug Name:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      Paracetamol
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Dose:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      3 tablets/day
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Strength:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      500mg
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-sm text-[#525252]">Duration:</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111111] break-words">
                      3 days
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end border-t px-10 py-5">
        <Button
          className="!bg-[#3872F9] text-[16px] font-semibold"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

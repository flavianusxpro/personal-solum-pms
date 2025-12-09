import { ActionIcon, Avatar, Badge, Button, Grid, Modal, Text, Title, Tooltip } from 'rizzui';
import { PiXBold, PiCopySimple } from 'react-icons/pi';
import { MdVerified } from 'react-icons/md';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';
import dayjs from 'dayjs';
import Link from 'next/link';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import cn from '@core/utils/class-names';

interface PatientDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: IGetAllPatientsResponse['data'][number];
}

export default function PatientDetailModal({
    isOpen,
    onClose,
    data,
}: PatientDetailModalProps) {
    const handleCopy = (text: string, label: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
    };

    const calculateAge = (dob: string) => {
        if (!dob) return '-';
        return dayjs().diff(dayjs(dob), 'year');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" className="p-0">
            <div className="relative pb-10 pt-6 px-6">
                <div className="absolute right-6 top-6">
                    <ActionIcon size="sm" variant="text" onClick={onClose}>
                        <PiXBold className="h-auto w-5" />
                    </ActionIcon>
                </div>

                {/* Header Section */}
                <div className="mb-8 flex items-start justify-between ">
                    <div className="flex items-center gap-4">
                        <Avatar
                            src={data.photo || ''}
                            name={`${data.first_name} ${data.last_name}`}
                            className="h-16 w-16 text-xl text-white"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <Title as="h4" className="text-lg font-bold">
                                    {data.first_name} {data.last_name}
                                </Title>
                                {/* @ts-ignore */}
                                {data.has_filled_consent_form === true && data.ihi_number && data.ihi_number !== '' && (
                                    <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                                        <MdVerified className="h-3.5 w-3.5" />
                                        Verified
                                    </div>
                                )}
                            </div>
                            <Text className="text-gray-500">{data.gender || '-'}</Text>
                        </div>
                    </div>
                    <Link href={routes.patient.patientDetail(data.patient_id?.toString())}>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 mr-12">
                            Go to Profile
                        </Button>
                    </Link>
                </div>

                {/* Personal & Contact Info Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 rounded-xl border border-gray-200 p-5">
                    {/* Personal Info */}
                    <div className="basis-[40%]">
                        <Title as="h6" className="mb-4 text-sm font-semibold text-gray-900">
                            Personal Info
                        </Title>
                        <div className="space-y-3">
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                                <Text className="text-gray-500">Age:</Text>
                                <Text className="font-medium">{calculateAge(data.date_of_birth)} years</Text>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                                <Text className="text-gray-500">DOB:</Text>
                                <Text className="font-medium">
                                    {data.date_of_birth ? dayjs(data.date_of_birth).format('DD MMMM YYYY') : '-'}
                                </Text>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                                <Text className="text-gray-500">Address:</Text>
                                <Text className="font-medium leading-relaxed">
                                    {/* @ts-ignore */}
                                    {[data.address_line_1, data.address_line_2].filter(Boolean).join(', ') || '-'}
                                </Text>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="basis-[60%]">
                        <Title as="h6" className="mb-4 text-sm font-semibold text-gray-900">
                            Contact Info
                        </Title>
                        <div className='flex gap-2 flex-col md:flex-row'>
                            <div className='flex-1 flex flex-col gap-2'>
                                <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
                                    <Text className="text-gray-500">Email:</Text>
                                    <div className="flex items-center gap-2">
                                        <Text className="font-medium truncate max-w-[180px]" title={data.email}>
                                            {data.email || '-'}
                                        </Text>
                                        {data.email && (
                                            <ActionIcon
                                                size="sm"
                                                variant="text"
                                                className="h-auto w-auto p-0 text-gray-400 hover:text-gray-600"
                                                onClick={() => handleCopy(data.email, 'Email')}
                                            >
                                                <PiCopySimple className="h-3.5 w-3.5" />
                                            </ActionIcon>
                                        )}
                                    </div>
                                </div>

                                {/* Note: Home and Work phone numbers are not in the interface, using placeholders or available fields */}
                                <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
                                    <Text className="text-gray-500">Home:</Text>
                                    <div className="flex items-center gap-2">
                                        <Text className="font-medium">{data.phone_home_number || '-'}</Text>
                                        {data.phone_home_number && (
                                            <ActionIcon
                                                size="sm"
                                                variant="text"
                                                className="h-auto w-auto p-0 text-gray-400 hover:text-gray-600"
                                                onClick={() => handleCopy(data.phone_home_number, 'Mobile number')}
                                            >
                                                <PiCopySimple className="h-3.5 w-3.5" />
                                            </ActionIcon>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col gap-2'>
                                <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
                                    <Text className="text-gray-500">Work:</Text>
                                    <div className="flex items-center gap-2">
                                        <Text className="font-medium">{data.phone_work_number || '-'}</Text>
                                        {data.phone_work_number && (
                                            <ActionIcon
                                                size="sm"
                                                variant="text"
                                                className="h-auto w-auto p-0 text-gray-400 hover:text-gray-600"
                                                onClick={() => handleCopy(data.phone_work_number, 'Mobile number')}
                                            >
                                                <PiCopySimple className="h-3.5 w-3.5" />
                                            </ActionIcon>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
                                    <Text className="text-gray-500">Mobile:</Text>
                                    <div className="flex items-center gap-2">
                                        <Text className="font-medium">{data.mobile_number || '-'}</Text>
                                        {data.mobile_number && (
                                            <ActionIcon
                                                size="sm"
                                                variant="text"
                                                className="h-auto w-auto p-0 text-gray-400 hover:text-gray-600"
                                                onClick={() => handleCopy(data.mobile_number, 'Mobile number')}
                                            >
                                                <PiCopySimple className="h-3.5 w-3.5" />
                                            </ActionIcon>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Healthcare Info Section */}
                <div className="rounded-xl border border-gray-200 p-5">
                    <Title as="h6" className="mb-4 text-sm font-semibold text-gray-900">
                        Healthcare Info
                    </Title>
                    <Grid gap="6" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-3">
                            <div className="grid grid-cols-[110px_1fr] gap-2">
                                <Text className="text-gray-500">Medicare Number:</Text>
                                <Text className="font-medium">{data.medicare_card_number || '-'}</Text>
                            </div>
                            <div className="grid grid-cols-[110px_1fr] gap-2">
                                <Text className="text-gray-500">Position:</Text>
                                {/* @ts-ignore - field might be missing in type definition but present in data */}
                                <Text className="font-medium">{data.position_on_card || '-'}</Text>
                            </div>
                            <div className="grid grid-cols-[110px_1fr] gap-2">
                                <Text className="text-gray-500">Expiry Date:</Text>
                                <Text className="font-medium">
                                    {data.medicare_expired_date ? dayjs(data.medicare_expired_date).format('MM/YYYY') : '-'}
                                </Text>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-[90px_1fr] gap-2">
                                <Text className="text-gray-500">DVA Number:</Text>
                                {/* @ts-ignore */}
                                <Text className="font-medium">{data.dva_card_number || '-'}</Text>
                            </div>
                            <div className="grid grid-cols-[90px_1fr] gap-2">
                                <Text className="text-gray-500">DVA Type:</Text>
                                {/* @ts-ignore */}
                                <Text className="font-medium">{data.dva_card_type || '-'}</Text>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                                <Text className="text-gray-500">IHI Number:</Text>
                                {/* @ts-ignore */}
                                <Text className="font-medium">{data.ihi_number || '-'}</Text>
                            </div>
                        </div>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
}

import { useModal } from "@/app/shared/modal-views/use-modal";
import { IGetAppointmentListResponse } from "@/types/ApiResponse";
import { Avatar, Button } from 'rizzui';
import { PiX, PiMapPin, PiCake, PiIdentificationCard, PiCalendarBlank, PiCopy } from 'react-icons/pi';
import { MdCancel, MdVerified } from "react-icons/md";
import dayjs from 'dayjs';
import { routes } from "@/config/routes";
import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";
import { useCopyToClipboard } from "react-use";
import { useEffect } from "react";
import toast from "react-hot-toast";

type DataTableType = IGetAppointmentListResponse['data'][number];

const ModalProfilePatient = (data: any) => {
    const { closeModal } = useModal();
    const [state, copyToClipboard] = useCopyToClipboard();
    const VerifiedBadge = ({ isVerified = true }: { isVerified?: boolean }) => {
        return (
            <span className={`flex items-center ${isVerified ? 'text-[#3872F9]' : 'text-gray-400'}  gap-[4px]`}>
                <MdVerified className="text-[16px] " />
                <span className="font-medium text-[14px]">{isVerified ? "Verified" : "Not Verified"}</span>
            </span>
        );
    };

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

    const getMissingInformation = () => {
        const ihiNumber = data?.data?.ihi_number;
        const email = data?.data?.email;
        const mobileNumber = data?.data?.mobile_number;
        const consentForm = data?.data?.has_filled_consent_form;

        const missingFields: string[] = [];

        if (!ihiNumber || ihiNumber.trim() === '') {
            missingFields.push('IHI Number');
        }

        if (!email || email.trim() === '') {
            missingFields.push('Email');
        }

        if (!mobileNumber ||
            mobileNumber.trim() === '' ||
            mobileNumber.startsWith('+') ||
            !mobileNumber.startsWith('04') ||
            mobileNumber.length !== 10
        ) {
            missingFields.push('Mobile Number');
        }

        if (!consentForm) {
            missingFields.push('Consent Form');
        }

        return missingFields;
    };
    const missingInfo = getMissingInformation();
    return (
        <div className="relative w-full rounded-[24px] bg-white p-10">
            {/* Close Button */}
            <button
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
                <PiX className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between my-6 gap-4">
                <div className="flex items-center gap-4">
                    {/* <Avatar
                        name={`${data?.data?.first_name} ${data?.data?.middle_name ? data?.data?.middle_name : ''} ${data?.data?.last_name}`}
                        src={data?.photo || `${data?.data?.first_name} ${data?.data?.middle_name ? data?.data?.middle_name : ''} ${data?.data?.last_name}`}
                        className="!h-[80px] text-white !w-[80px] text-xl"
                    /> */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-[8px]">
                            <h2 className="text-[18px] font-semibold capitalize">
                                {data?.data?.patient
                                    ?.first_name} {data?.data?.middle_name ? data?.data?.middle_name : ''} {data?.data
                                        ?.last_name}
                            </h2>
                            <VerifiedBadge
                                isVerified={data?.data?.ihi_number !== null && data?.data?.has_filled_consent_form}
                            />
                        </div>
                        {missingInfo.length > 0 && (
                            <p className="text-sm font-normal font-inter">
                                ⚠️ Missing required information: <span className="font-bold"> {missingInfo.join(', ')}</span>
                            </p>
                        )}
                        <p className="text-sm text-[#525252]">
                            {data?.data?.gender ? (data?.data?.gender).charAt(0).toUpperCase() + (data?.data?.gender).substr(1).toLowerCase() : '-'}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link
                        href={routes.patient.edit(data?.data?.patient_id.toString())}
                    >
                        <Button
                            className="text-[16px] font-semibold"
                            variant="outline"
                        >
                            Edit Profile
                        </Button>
                    </Link>

                    <Link
                        href={routes.patient.patientDetail(data?.data?.patient_id.toString())}
                    >
                        <Button
                            className="!bg-[#3872F9] text-[16px] font-semibold"
                        >
                            Go to Profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content*/}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 rounded-lg border border-[#E4E4E4] p-4">
                {/* Personal Info */}
                <div>
                    <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                        Personal Info
                    </h3>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">Age:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.age ?? '-'}</p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">DOB:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.date_of_birth
                                ? dayjs(data.data.date_of_birth, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']).format('D MMMM YYYY')
                                : '-'}
                            </p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">
                                Address:
                            </p>
                            <p className="text-sm text-[#111111]">
                                {data?.data?.address_line_1 ? `${data?.data?.address_line_1 + ','}` : ''}
                                {data?.data?.address_line_2 ? `${data?.data?.address_line_2 + ','}` : ''}
                                {data?.data?.suburb ? `${data?.data?.suburb + ','}` : '-'}
                                {data?.data?.postcode ? `${data?.data?.postcode + ','}` : '-'}
                                {data?.data?.country ? `${data?.data?.country}` : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                        Contact Info
                    </h3>
                    <div className="flex gap-[8px]">
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex">
                                <p className="text-sm text-[#525252] mr-5">Email:</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-[#111111]">{data?.data?.email ?? '-'}</p>
                                    {data?.data?.email && (
                                        <PiCopy
                                            onClick={() =>
                                                handleCopy(data?.data?.email)
                                            }
                                            className="cursor-pointer active:scale-[0.99]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex">
                                <p className="text-sm text-[#525252] mr-5">Home:</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-[#111111]">{data?.data?.phone_home_number ?? '-'}</p>
                                    {data?.data?.phone_home_number && (
                                        <PiCopy
                                            onClick={() =>
                                                handleCopy(data?.data?.phone_home_number)
                                            }
                                            className="cursor-pointer active:scale-[0.99]"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <div className="flex gap-[8px] mt-[34px]">
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex">
                                <p className="text-sm text-[#525252] mr-5">Work:</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-[#111111]">{data?.data?.phone_work_number ?? '-'}</p>
                                    {data?.data?.phone_work_number && (
                                        <PiCopy
                                            onClick={() =>
                                                handleCopy(data?.data?.phone_work_number)
                                            }
                                            className="cursor-pointer active:scale-[0.99]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex">
                                <p className="text-sm text-[#525252] mr-5">Mobile:</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-[#111111]">{data?.data?.mobile_number ?? '-'}</p>

                                    {data?.data?.mobile_number && (
                                        <PiCopy
                                            onClick={() =>
                                                handleCopy(data?.data?.mobile_number)
                                            }
                                            className="cursor-pointer active:scale-[0.99]"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Healthcare Info */}
            <div className="rounded-lg border border-[#E4E4E4] p-4">
                <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                    Healthcare Info
                </h3>
                <div className="flex gap-[8px]">
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">Medicare Number:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.medicare_card_number ?? '-'}</p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">Position:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.position_on_card ?? '-'}</p>
                        </div>
                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">Expiry Date:</p>
                            <p className="text-sm text-[#111111]">
                                {data?.data?.medicare_expired_date
                                    ? dayjs(data.data.medicare_expired_date, 'DD MM YYYY').format('MM/YYYY')
                                    : '-'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">DVA Number:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.concession_card_number ?? '-'}</p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">DVA Type:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.concession_card_type ?? '-'}</p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex">
                            <p className="text-sm text-[#525252] mr-5">IHI Number:</p>
                            <p className="text-sm text-[#111111]">{data?.data?.ihi_number ?? '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProfilePatient;
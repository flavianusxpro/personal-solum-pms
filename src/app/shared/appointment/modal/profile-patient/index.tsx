import { useModal } from "@/app/shared/modal-views/use-modal";
import { IGetAppointmentListResponse } from "@/types/ApiResponse";
import { Avatar, Button } from 'rizzui';
import { PiX, PiMapPin, PiCake, PiIdentificationCard, PiCalendarBlank } from 'react-icons/pi';
import { MdCancel, MdVerified } from "react-icons/md";
import dayjs from 'dayjs';
import { routes } from "@/config/routes";
import Link from "next/link";

type DataTableType = IGetAppointmentListResponse['data'][number];

const ModalProfilePatient = (data: any) => {
    const { closeModal } = useModal();
    const VerifiedBadge = ({ isVerified = true }: { isVerified?: boolean }) => {
        if (isVerified) {
            return (
                <span className="flex items-center text-[#3872F9] gap-[4px]">
                    <MdVerified className="text-[16px] " />
                    <span className="font-medium text-[14px] ">Verified</span>
                </span>
            );
        }

        return (
            <span className="flex items-center text-[#DC2626] gap-[4px]">
                <MdCancel className="text-[16px]" />
                <span className="font-medium text-[14px]">Not Verified</span>
            </span>
        );
    };

    console.log('zzz data yama', data);

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
                    <Avatar
                        name={`${data?.data?.patient?.first_name} ${data?.data?.patient?.last_name}`}
                        src={data?.patient?.photo || `${data?.data?.patient?.first_name} ${data?.data?.patient?.last_name}`}
                        className="!h-[80px] !w-[80px]"
                    />
                    <div>
                        <div className="flex items-center gap-[8px]">
                            <h2 className="text-[18px] font-semibold">
                                {data?.data?.patient
                                    ?.first_name} {data?.data?.patient
                                        ?.last_name}
                            </h2>
                            <VerifiedBadge
                                isVerified={data?.data?.patient?.verification_status}
                            />

                        </div>
                        <p className="text-sm text-[#525252]">
                            {data?.data?.patient?.gender ? (data?.data?.patient?.gender).charAt(0).toUpperCase() + (data?.data?.patient?.gender).substr(1).toLowerCase() : '-'}
                        </p>
                    </div>
                </div>

                <Link
                    href={routes.patient.patientDetail(data?.data?.patient?.patient_id.toString())}
                >
                    <Button
                        className="!bg-[#3872F9] text-[16px] font-semibold"
                    >
                        Go to Profile
                    </Button>
                </Link>
            </div>

            {/* Content Grid */}
            <div className="flex gap-4 mb-4">
                {/* Personal Info */}
                <div className="rounded-lg basis-[40%] border border-[#E4E4E4] p-4">
                    <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                        Personal Info
                    </h3>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[20%]">Age:</p>
                            <p className="text-sm text-[#111111] basis-[80%]">{data?.data?.patient?.age ?? '-'}</p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[20%]">DOB:</p>
                            <p className="text-sm text-[#111111] basis-[80%]">{data?.data?.patient?.date_of_birth
                                ? dayjs(data.data.patient.date_of_birth, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']).format('D MMMM YYYY')
                                : '-'}
                            </p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[20%]">Address:</p>
                            <p className="text-sm text-[#111111] basis-[80%]">
                                {data?.data?.patient?.address_line_1 ?? '-'}, {data?.data?.patient?.suburb ?? '-'},
                                {data?.data?.patient?.address_line_1 ?? '-'}, {data?.data?.patient?.country ?? '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="rounded-lg basis-[60%] border border-[#E4E4E4] p-4">
                    <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                        Contact Info
                    </h3>
                    <div className="flex gap-[8px]">
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex">
                                <p className="text-sm text-[#525252] basis-[20%]">Email:</p>
                                <p className="text-sm text-[#111111] basis-[80%]">{data?.data?.patient?.email ?? '-'}</p>
                            </div>

                            <div className="flex">
                                <p className="text-sm text-[#525252] basis-[20%]">Home:</p>
                                <p className="text-sm text-[#111111] basis-[80%]">{data?.data?.patient?.phone_home_number ?? '-'}</p>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex">
                                <p className="text-sm text-[#525252] basis-[20%]">Work:</p>
                                <p className="text-sm text-[#111111] basis-[80%]">{data?.data?.patient?.phone_work_number ?? '-'}</p>
                            </div>

                            <div className="flex">
                                <p className="text-sm text-[#525252] basis-[20%]">Mobile:</p>
                                <p className="text-sm text-[#111111] basis-[80%]">{data?.data?.patient?.mobile_number ?? '-'}</p>
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
                            <p className="text-sm text-[#525252] basis-[40%]">Medicare Number:</p>
                            <p className="text-sm text-[#111111] basis-[60%]">{data?.data?.patient?.medicare_card_number ?? '-'}</p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[40%]">Position:</p>
                            <p className="text-sm text-[#111111] basis-[60%]">{data?.data?.patient?.position_on_card ?? '-'}</p>
                        </div>
                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[40%]">Expiry Date:</p>
                            <p className="text-sm text-[#111111] basis-[60%]">
                                {data?.data?.patient?.medicare_expired_date
                                    ? dayjs(data.data.patient.medicare_expired_date, 'DD MM YYYY').format('MM/YYYY')
                                    : '-'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[40%]">DVA Number:</p>
                            <p className="text-sm text-[#111111] basis-[60%]">{data?.data?.patient?.concession_card_number ?? '-'}</p>
                        </div>

                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[40%]">DVA Type:</p>
                            <p className="text-sm text-[#111111] basis-[60%]">{data?.data?.patient?.concession_card_type ?? '-'}</p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex">
                            <p className="text-sm text-[#525252] basis-[40%]">IHI Number:</p>
                            <p className="text-sm text-[#111111] basis-[60%]">{data?.data?.patient?.ihi_number ?? '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProfilePatient;
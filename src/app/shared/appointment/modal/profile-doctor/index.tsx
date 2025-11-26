import { useModal } from "@/app/shared/modal-views/use-modal";
import { IGetAppointmentListResponse } from "@/types/ApiResponse";
import { Avatar, Button } from 'rizzui';
import { PiX, PiMapPin, PiEnvelope, PiPhone, PiTranslate, PiBriefcase } from 'react-icons/pi';
import dayjs from 'dayjs';
import Link from "next/link";
import { routes } from "@/config/routes";

type DataTableType = IGetAppointmentListResponse['data'][number];

const ModalProfileDoctor = (data: any) => {
    const { closeModal } = useModal();

    function toNormalCase(text: string) {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    const languages: string[] = (() => {
        try {
            const value = data?.data?.doctor?.language;
            const parsed = typeof value === "string" ? JSON.parse(value) : [];

            if (!Array.isArray(parsed)) return [];

            return parsed.map((item) => toNormalCase(String(item)));
        } catch {
            return [];
        }
    })();

    function stripHtml(htmlString: string) {
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        return doc.body.textContent || "";
    }

    return (
        <div className="relative w-full rounded-[24px] p-6">
            {/* Close Button */}
            <button
                onClick={closeModal}
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
                <PiX className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex justify-between items-center gap-4 my-6">
                <div className="mb-6 flex items-center gap-4">
                    <Avatar
                        name={`${data?.data?.doctor?.first_name} ${data?.data?.doctor?.last_name}`}
                        src={data?.doctor?.photo || `${data?.data?.doctor?.first_name} ${data?.data?.doctor?.last_name}`}
                        className="!h-[80px] !w-[80px]"
                    />
                    <div className="flex-1 flex flex-col gap-[6px]">
                        <div className="flex items-center gap-4">
                            <h2 className="text-[18px] font-semibold">
                                Dr. {`${data?.data?.doctor?.first_name} ${data?.data?.doctor?.last_name}`}
                            </h2>
                            <span className="rounded-[4px] border border-[#E4E4E4] px-[8px] py-[4px] text-xs text-[#999999]">
                                {data?.data?.doctor?.specialists?.[0].name ?? '-'}
                            </span>
                        </div>
                        <p className="text-sm text-[#444444]">
                            {"MBChB - Bachelor of Medicine and Bachelor of Surgery."}
                        </p>
                        <div className="flex items-start">
                            <PiMapPin className="text-[18px]" />
                            <p className="text-sm text-[#525252]">
                                {data?.data?.doctor?.country ?? '-'}, {data?.data?.doctor?.state ?? '-'}
                            </p>
                        </div>
                    </div>
                </div>

                <Link
                    href={routes.doctor.doctorDetail(data?.data?.doctor?.id?.toString())}
                >
                    <Button
                        className="!bg-[#3872F9] text-[16px] font-semibold"
                    >
                        Go to Profile
                    </Button>
                </Link>
            </div>

            {/* Doctor Details */}
            <div className="mb-[16px] rounded-[8px] border border-[#E4E4E4] p-[16px]">
                <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                    Doctor Details
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                        <PiEnvelope className="text-[18px]" />
                        <div className="flex-1">
                            <p className="text-sm text-[#525252]">
                                {data?.data?.doctor?.email ?? '-'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <PiTranslate className="text-[18px]" />
                        <div className="flex-1">
                            <p className="text-[#525252] text-sm">
                                {languages.join(", ")}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <PiPhone className="text-[18px]" />
                        <div className="flex-1">
                            <p className="text-sm text-[#525252]">
                                {data?.data?.doctor?.mobile_number ?? '-'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <PiBriefcase className="text-[18px]" />
                        <div className="flex-1">
                            <p className="text-sm text-[#525252]">
                                {data?.data?.doctor?.email ?? '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctor Bio */}
            <div className="rounded-[8px] border border-[#E4E4E4] p-[16px]">
                <h3 className="mb-4 font-semibold text-sm text-[#525252]">
                    Doctor Bio
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#444444]">
                   {stripHtml(data?.data?.doctor?.description ?? '-')}
                </p>
                <div>
                    <p className="text-sm text-[#444444]">
                        <span className="font-semibold">Areas of Interest:</span>{" "}
                        <span className="text-gray-700">
                            {data?.data?.doctor?.medical_interest ?? '-'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalProfileDoctor;
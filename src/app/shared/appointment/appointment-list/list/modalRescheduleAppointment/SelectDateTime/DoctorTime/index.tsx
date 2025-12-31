import { IGetDoctorByClinicResponse } from "@/types/ApiResponse";
import useDoctorTime from "./useDoctorTime";
import { useMemo } from "react";
import dayjs from "dayjs";
import cn from "@/core/utils/class-names";

function DoctorTime({
    doctor,
    onChange,
    formData,
    data,
    isExpanded
}: {
    doctor: IGetDoctorByClinicResponse['data'][number];
    onChange: (key: string, value: any) => void;
    formData: any;
    data: any;
    isExpanded: any;
}) {
    const {
        dataAvailability,
        isPendingAvailability
    } = useDoctorTime({ formData, data, doctor })

    const timeList = useMemo(() => {
        if (!dataAvailability?.data) return [];
        return dataAvailability.data.reduce((acc, item) => {
            if (item.available) {
                const timeObj = dayjs.utc(item.time, 'YYYY-MM-DD HH:mm', true);
                acc.push({
                    display: timeObj.format('hh:mm A'),
                    storage: timeObj.format('HH:mm'),
                });
            }
            return acc;
        }, [] as { display: string; storage: string }[]);
    }, [dataAvailability?.data]);

    return (
        <>
            {timeList.length > 0 ? (
                <div className='relative'>
                    <div
                        className={cn(
                            'grid grid-cols-5 gap-2 transition-all delay-200 duration-1000 ease-in-out overflow-hidden',
                            isExpanded ? 'max-h-[500px]' : 'max-h-20'
                        )}
                    >
                        {timeList.map((time: any, index: number) => (
                            <button
                                key={index}
                                type='button'
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm transition-colors',
                                    formData.doctorTime === time.storage && formData.doctorId === doctor.id
                                        ? 'bg-green-600 text-white'
                                        : 'bg-green-200/50 hover:bg-green-300'
                                )}
                                onClick={() => {
                                    onChange('doctorTime', time.storage);
                                    onChange('doctorId', doctor.id as number);
                                    onChange('fee', doctor.cost.amount);
                                    onChange('doctorFirstName', doctor.first_name);
                                    onChange('doctorLastName', doctor.last_name);
                                }}
                            >
                                {time.display}
                            </button>
                        ))}
                    </div>
                    <div
                        className={cn(
                            'absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-white to-white/50 transition-opacity duration-1000 ease-in-out',
                            !isExpanded
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        )}
                    />
                </div>
            ) : (
                <div className='bg-gray-50 p-4'>
                    <span className="rounded-md px-2 py-1 text-green-700">
                        Next available:{' '}
                        <span className="text-black">Please contact centre</span>
                    </span>
                </div>
            )}
        </>
    )
}

export default DoctorTime
import dayjs from "dayjs";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Button, Text, Title } from "rizzui";

interface PropTypes {
    data: any;
    newDate: any;
    newTime: any;
    newDoctorName: any;
    onConfirm: () => void;
    onCancel: () => void;
    isPendingReschedule: boolean
}

const WeeklyModalReschedule = (props: PropTypes) => {
    const {
        data,
        newDate,
        newTime,
        newDoctorName,
        onConfirm,
        onCancel,
        isPendingReschedule,
    } = props

    const combined = dayjs.utc(`${newDate} ${newTime}`, "YYYY-MM-DD HH:mm");

    return (
        <div className="relative flex justify-center md:items-center">
            <div className="w-full">
                <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
                    <Title as="h2" className="font-lexend text-lg font-semibold">
                        Reschedule Appointment
                    </Title>
                    <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => onCancel()}
                        className="p-0 text-gray-500 hover:!text-gray-900"
                    >
                        <PiXBold className="h-5 w-5" />
                    </ActionIcon>
                </div>
                <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
                    <Text className="text-base font-semibold">Reschedule Confirmation</Text>

                    <div className="">
                        <Text className="font-semibold">Last Schedule</Text>
                        <Text>
                            Date & Time : {dayjs(data?.date).format('MMM DD, YYYY')} - {dayjs.utc(data?.date).format("HH:mm A")}
                        </Text>

                        <Text>Doctor : {data?.doctor?.first_name} {data?.doctor?.last_name}
                        </Text>
                    </div>

                    <div className="">
                        <Text className="font-semibold">New Schedule</Text>
                        <Text>
                            Date & Time : {combined.format("MMM DD, YYYY")} - {combined.format("hh:mm A")}
                        </Text>
                        <Text> Doctor : {newDoctorName}
                        </Text>
                    </div>

                </div>
                <div
                    className="flex w-full items-center justify-end border-t border-gray-300 px-5 py-5 md:px-7"
                >
                    <Button 
                        onClick={onConfirm} 
                        className="!w-auto"
                        rounded="lg"
                        variant="outline"
                        disabled={isPendingReschedule}
                        isLoading={isPendingReschedule}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WeeklyModalReschedule
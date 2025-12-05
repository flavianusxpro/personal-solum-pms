import { useDrag, useDrop } from "react-dnd";
import AppointmentDetailsCalendar from "../../AppointmentDetailsCalendar";
import cn from "@/core/utils/class-names";
import { Text } from "rizzui";

const ITEM_TYPE = "APPOINTMENT";

export function WeeklyAppointmentCell({
    apt,
    doctorName,
    bgColor,
    rowTime,
    dayKey,
    openModal,
    handleDrop,
}: any) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { 
            appointment: apt,
            originalDoctor: doctorName,
            originalTime: rowTime,
            originalDay: dayKey
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [apt, doctorName, rowTime, dayKey]);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ITEM_TYPE,
        drop: (item: any) => {
            if (item.appointment?.id === apt?.id) return;
            handleDrop?.(item.appointment, doctorName, rowTime);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [apt, doctorName, rowTime, handleDrop]);

    const combinedRef = (el: HTMLDivElement | null) => {
        dragRef(el);
        dropRef(el);
    };

    return (
        <div
            ref={combinedRef}
            className={cn(
                "px-4 py-2 rounded cursor-move transition-colors",
                isOver && "ring-2 ring-blue-400"
            )}
            style={{
                backgroundColor: bgColor + "20",
                borderLeft: `4px solid ${bgColor}`,
                opacity: isDragging ? 0.5 : 1,
            }}
            onClick={(e) => {
                e.stopPropagation();
                openModal({
                    view: <AppointmentDetailsCalendar data={apt} />,
                    customSize: "1100px",
                });
            }}
        >
            <Text className="text-sm font-semibold" style={{ color: bgColor }}>
                {doctorName}
            </Text>
        </div>
    );
}
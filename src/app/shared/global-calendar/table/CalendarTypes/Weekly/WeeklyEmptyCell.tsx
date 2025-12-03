import { useDrop } from "react-dnd";
import cn from "@/core/utils/class-names";
import { useRef, useEffect } from "react";

const ITEM_TYPE = "APPOINTMENT";

export function WeeklyEmptyCell({
    dayKey,
    rowTime,
    handleDrop,
}: {
    dayKey: string;
    rowTime: string;
    handleDrop: any;
}) {
    const ref = useRef<HTMLDivElement>(null);
    
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ITEM_TYPE,
        drop: (item: any) => {
            console.log('Dropping to empty cell:', item.appointment, dayKey, rowTime);
            handleDrop?.(item.appointment, dayKey, rowTime);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [dayKey, rowTime, handleDrop]);

    useEffect(() => {
        if (ref.current) {
            dropRef(ref.current);
        }
    }, [dropRef]);

    return (
        <div
            ref={ref}
            className={cn(
                "h-12 w-full rounded transition-colors",
                isOver ? "bg-blue-100 border-2 border-dashed border-blue-400" : "bg-transparent"
            )}
        />
    );
}
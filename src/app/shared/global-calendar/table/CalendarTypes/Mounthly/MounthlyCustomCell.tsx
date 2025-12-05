import dayjs from "dayjs";

const MounthlyCustomCell = ({ value, children, events }: any) => {
    const dateStr = dayjs(value).format('YYYY-MM-DD');
    const hasEvents = events.some(
        (event: any) => dayjs(event.start).format('YYYY-MM-DD') === dateStr
    );

    return (
        <div className="rbc-day-bg relative">
            {children}
            {!hasEvents && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <svg
                        className="mb-1 h-10 w-10 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="text-sm font-medium text-gray-400">No Appointment</span>
                </div>
            )}
        </div>
    );
};

export default MounthlyCustomCell;
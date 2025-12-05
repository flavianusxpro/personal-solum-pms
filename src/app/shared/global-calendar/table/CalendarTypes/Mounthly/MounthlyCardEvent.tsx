const MounthlyCardEvent = ({ event }: any) => {
  const getColorByType = (type: string) => {
    const appointmentType = type?.toLowerCase() || '';

    if (appointmentType.includes('initial')) {
      return {
        bg: '#E8F5E9',
        border: '#1FA551',
        text: '#1FA551',
      };
    } else if (appointmentType.includes('follow')) {
      return {
        bg: '#E3F2FD',
        border: '#0078D7',
        text: '#0078D7',
      };
    } else if (appointmentType.includes('transfer')) {
      return {
        bg: '#FFF3E0',
        border: '#F4A523',
        text: '#F4A523',
      };
    } else if (appointmentType.includes('reschedule')) {
      return {
        bg: '#FFEBEE',
        border: '#E84757',
        text: '#E84757',
      };
    } else {
      return {
        bg: '#F5F5F5',
        border: '#6B7280',
        text: '#6B7280',
      };
    }
  };

  const appointmentType = event?.appointment?.type || '';
  const colors = getColorByType(appointmentType);

  return (
    <div
      className="cursor-pointer rounded px-2 py-1.5 transition-opacity hover:opacity-80"
      style={{
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
      }}
      title={`${event.time} - Dr. ${event.doctor}\n${event.patient}\nType: ${appointmentType}`}
    >
      <div
        className="truncate text-[11px] font-semibold leading-tight"
        style={{ color: colors.text }}
      >
        {event.time} - Dr. {event.doctor}
      </div>
      <div className="mt-0.5 truncate text-[11px] leading-tight text-gray-700">
        {event.patient}
      </div>
    </div>
  );
};

export default MounthlyCardEvent
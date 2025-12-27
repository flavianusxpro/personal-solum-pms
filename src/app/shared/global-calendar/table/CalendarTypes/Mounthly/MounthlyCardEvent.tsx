import React from 'react';
import { EventProps } from 'react-big-calendar';

interface CustomEvent {
  title: string;
  doctor: string;
  patient: string;
  time: string;
  start: Date;
  end: Date;
  resourceId: string;
  raw: any;
  appointment: any;
}

const MonthlyCardEvent: React.FC<EventProps<CustomEvent>> = ({ event }) => {
  const appointmentType = event.appointment?.type;

  const getEventStyles = () => {
    switch (appointmentType) {
      case 'Initial Consult':
        return {
          backgroundColor: '#EAF4F8',
          color: '#3291B6'
        };
      case 'Follow Up Appointment':
      case 'Follow Up':
        return {
          backgroundColor: '#F8F4FA',
          color: '#BB8ED0'
        };
      case 'Transfer':
        return {
          backgroundColor: '#FCF6F6',
          color: '#E0A8A8'
        };
      default:
        return {
          backgroundColor: '#EFF6FF',
          color: '#3B82F6'
        };
    }
  };

  const styles = getEventStyles();

  return (
    <div 
      className='px-2 py-1 h-full w-full rounded-lg'
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color
      }}
    >
      <div className="font-normal text-xs truncate" style={{ color: styles.color }}>
        {event.time} - {event.title}
      </div>
      <div className="text-xs truncate" style={{ color: styles.color }}>
        {event.patient}
      </div>
    </div>
  );
};

export default MonthlyCardEvent;
import { Modal, Button, Text } from 'rizzui';
import { LuClock, LuUser, LuCalendar } from 'react-icons/lu';

interface ScheduleSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    time: string;
    doctorFirstName: string;
    doctorLastName: string;
    doctorId: number;
  } | null;
  onBookAppointment?: (data: any) => void;
}

export default function ScheduleSlotModal({ 
  isOpen, 
  onClose, 
  data,
  onBookAppointment 
}: ScheduleSlotModalProps) {
  if (!data) return null;

  const handleBooking = () => {
    onBookAppointment?.(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-auto px-7 pb-8 pt-6">
        <div className="mb-7 flex items-center justify-between">
          <Text className="text-lg font-semibold">
            Available Schedule Slot
          </Text>
        </div>

        <div className="space-y-4">
          {/* Time */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <LuClock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Text className="text-xs text-gray-500">Time Slot</Text>
              <Text className="font-semibold">{data.time}</Text>
            </div>
          </div>

          {/* Doctor */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <LuUser className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <Text className="text-xs text-gray-500">Doctor</Text>
              <Text className="font-semibold">
                Dr. {data.doctorFirstName} {data.doctorLastName}
              </Text>
              <Text className="text-xs text-gray-400">ID: {data.doctorId}</Text>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBooking}
              className="flex-1"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
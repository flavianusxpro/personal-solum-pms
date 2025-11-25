import { useModal } from "@/app/shared/modal-views/use-modal";
import { IGetAppointmentListResponse } from "@/types/ApiResponse";
import { PiX } from 'react-icons/pi';
import dayjs from 'dayjs';

type DataTableType = IGetAppointmentListResponse['data'][number];

const ModalReminder = (data: any) => {
    const { closeModal } = useModal();
    const reminders = [
        {
            id: 1,
            from: 'System (Auto-Generated)',
            to: 'sasmithayuli@gmail.com',
            sentOn: '2025-11-24T09:00:00',
            method: 'Email',
            message: 'Hi Sasmitha Yuli, this is a reminder for your appointment tomorrow at 09:00 AM with Dr. Doni Yahya.',
            patientName: 'Sasmitha Yuli',
            doctorName: 'Dr. Doni Yahya',
            appointmentDate: '2025-11-25T09:00:00'
        },
        {
            id: 2,
            from: 'System (Auto-Generated)',
            to: 'sasmithayuli@gmail.com',
            sentOn: '2025-11-20T10:00:00',
            method: 'SMS',
            message: 'Hi Sasmitha Yuli, this is a reminder for your appointment tomorrow at 09:00 AM with Dr. Doni Yahya.',
            patientName: 'Sasmitha Yuli',
            doctorName: 'Dr. Doni Yahya',
            appointmentDate: '2025-11-25T09:00:00'
        },
        {
            id: 3,
            from: 'System (Auto-Generated)',
            to: 'johnsmith@gmail.com',
            sentOn: '2025-11-23T14:30:00',
            method: 'Email',
            message: 'Hi John Smith, this is a reminder for your appointment on 25 Nov 2025 at 02:00 PM with Dr. Sarah Johnson.',
            patientName: 'John Smith',
            doctorName: 'Dr. Sarah Johnson',
            appointmentDate: '2025-11-25T14:00:00'
        },
        {
            id: 4,
            from: 'System (Auto-Generated)',
            to: 'maryjane@gmail.com',
            sentOn: '2025-11-22T08:00:00',
            method: 'SMS',
            message: 'Hi Mary Jane, this is a reminder for your appointment on 24 Nov 2025 at 10:30 AM with Dr. Michael Chen.',
            patientName: 'Mary Jane',
            doctorName: 'Dr. Michael Chen',
            appointmentDate: '2025-11-24T10:30:00'
        },
        {
            id: 5,
            from: 'System (Auto-Generated)',
            to: 'robertlee@gmail.com',
            sentOn: '2025-11-21T16:15:00',
            method: 'Email',
            message: 'Hi Robert Lee, this is a reminder for your appointment on 23 Nov 2025 at 11:00 AM with Dr. Emily Brown.',
            patientName: 'Robert Lee',
            doctorName: 'Dr. Emily Brown',
            appointmentDate: '2025-11-23T11:00:00'
        },
        {
            id: 6,
            from: 'System (Auto-Generated)',
            to: 'lisawong@gmail.com',
            sentOn: '2025-11-19T13:45:00',
            method: 'SMS',
            message: 'Hi Lisa Wong, this is a reminder for your appointment on 21 Nov 2025 at 03:30 PM with Dr. David Kim.',
            patientName: 'Lisa Wong',
            doctorName: 'Dr. David Kim',
            appointmentDate: '2025-11-21T15:30:00'
        },
        {
            id: 7,
            from: 'System (Auto-Generated)',
            to: 'tomhanks@gmail.com',
            sentOn: '2025-11-18T11:00:00',
            method: 'Email',
            message: 'Hi Tom Hanks, this is a reminder for your appointment on 20 Nov 2025 at 01:00 PM with Dr. Jennifer Lee.',
            patientName: 'Tom Hanks',
            doctorName: 'Dr. Jennifer Lee',
            appointmentDate: '2025-11-20T13:00:00'
        }
    ];

    return (
        <div className="relative w-full rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold">
                    Reminder Sent Details
                </h2>
                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                {reminders.map((reminder: any, index: number) => (
                    <div
                        key={index}
                        className={`${index !== 0 ? 'mt-6 border-t border-gray-200 pt-6' : ''
                            }`}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-[100px_1fr] gap-y-3">
                                <div className="text-sm text-[#787878]">From:</div>
                                <div className="text-sm font-medium">
                                    {reminder.from || 'System (Auto-Generated)'}
                                </div>

                                <div className="text-sm text-[#787878]">To:</div>
                                <div className="text-sm font-medium">
                                    {reminder.to}
                                </div>

                                <div className="text-sm text-[#787878]">Sent On:</div>
                                <div className="text-sm font-medium">
                                    {dayjs(reminder.sentOn).format('DD MMM YYYY, h:mm A')}
                                </div>

                                <div className="text-sm text-[#787878]">Method:</div>
                                <div className="text-sm font-medium">
                                    {reminder.method}
                                </div>
                            </div>

                            <div>
                                <div className="rounded-lg bg-[#FAFAFA] p-4">
                                    <p className="text-sm font-semibold">
                                        {reminder.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModalReminder;
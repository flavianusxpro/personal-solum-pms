import { PiMagnifyingGlassLight } from 'react-icons/pi';
import { Avatar, Flex, Input, Text, Title } from 'rizzui';
import AddNewEmail from './modal/email-compose';
const emailMessages = [
  {
    section: 'Today',
    messages: [
      {
        id: 1,
        sender: 'Maria Lopez',
        subject: 'Appointment Confirmation for Tomorrow',
        message:
          'Hi, I’ve confirmed my appointment with Dr. Anderson for tomorrow at 10:00 AM. Please let me know if I need to bring any documents.',
        time: '8:45 AM',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      },
      {
        id: 2,
        sender: 'Dr. Emily Turner',
        subject: 'Follow-up: Patient Lab Results (John Miller)',
        message:
          'Please review the latest lab results for John Miller. Cholesterol level improved slightly, but sugar remains high.',
        time: '9:55 AM',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
    ],
  },
  {
    section: 'Yesterday',
    messages: [
      {
        id: 3,
        sender: 'Inventory Dept',
        subject: 'Medication Restock Request – Amoxicillin 500mg',
        message:
          'Stock for Amoxicillin 500mg is low (18 boxes remaining). Kindly approve reorder from MedLine supplier.',
        time: '10:35 AM',
        avatar: 'I',
      },
      {
        id: 4,
        sender: 'Mark Thompson',
        subject: 'Request to Reschedule Appointment',
        message:
          'Hi, I’d like to reschedule my appointment with Dr. Emily Turner originally set for October 13 at 3:00 PM. Can I move it to Friday morning instead?',
        time: '10:55 AM',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      },
      {
        id: 5,
        sender: 'Radiology Dept.',
        subject: 'Reminder: Schedule Next MRI Exam',
        message: 'It’s time to schedule your next MRI exam.',
        time: '11:58 AM',
        avatar: 'R',
      },
      {
        id: 6,
        sender: 'Cinderella Poetri',
        subject: 'Appointment Confirmation: Physical Therapy',
        message:
          'Your physical therapy session with Dr. Ramirez on November 7th is confirmed. Please arrive 15 minutes early.',
        time: '1:00 PM',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      {
        id: 7,
        sender: 'Billing Department',
        subject: 'Invoice Reminder: Payment Due',
        message: 'Reminder: Your invoice is due. Please submit payment.',
        time: '2:22 PM',
        avatar: 'B',
      },
    ],
  },
];

type IEmailListsProps = {
  selectedSidebar: string | null;
  selectedEmail?: any;
  openAddEmail: boolean;
  setSelectedEmail?: (email: any) => void;
  setOpenAddEmail: (open: boolean) => void;
};

const EmailLists = ({
  selectedSidebar,
  selectedEmail,
  setSelectedEmail,
  openAddEmail,
  setOpenAddEmail,
}: IEmailListsProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-20 items-center justify-between border-b p-5">
        <Flex className="w-full" justify="between" align="center">
          {selectedSidebar && (
            <Title as="h5" className="font-medium uppercase text-black">
              {selectedSidebar}
            </Title>
          )}

          <Input
            type="text"
            placeholder="Search email"
            size="sm"
            prefix={
              <PiMagnifyingGlassLight className="h-5 w-5 cursor-pointer" />
            }
          />
        </Flex>
      </div>

      <div className="relative flex flex-col overflow-y-auto">
        {emailMessages.map((section) => (
          <div key={section.section} className="flex w-full flex-col">
            <Text className="bg-[#78787826] px-8 py-2 uppercase">
              {section.section}
            </Text>
            <div className={`flex flex-col`}>
              {section.messages.map((message) => (
                <>
                  <div
                    key={message.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg p-6 ${selectedEmail?.id === message.id && 'bg-[#3872F90D]'}`}
                    onClick={() =>
                      setSelectedEmail && setSelectedEmail(message)
                    }
                  >
                    <Avatar
                      size="md"
                      src={message.avatar || undefined}
                      name={message.sender}
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex justify-between">
                        <Text className="font-semibold text-[#787878]">
                          {message.sender}
                        </Text>
                        <Text className="text-sm font-medium text-[#787878]">
                          {message.time}
                        </Text>
                      </div>
                      <Text className="font-medium text-black">
                        {message.subject}
                      </Text>
                      <Text className="text-sm font-normal text-[#787878]">
                        {message.message}
                      </Text>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        ))}
        <div
          className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[350px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            openAddEmail ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {openAddEmail && (
            <AddNewEmail user_id={1} onClose={() => setOpenAddEmail(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailLists;

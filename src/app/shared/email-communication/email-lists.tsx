import { PiMagnifyingGlassLight } from 'react-icons/pi';
import { Avatar, Flex, Input, Text, Title } from 'rizzui';
import AddNewEmail from './modal/email-compose';
import { useModal } from '../modal-views/use-modal';
const emailMessages = [
  {
    section: 'Today',
    messages: [
      {
        id: 1,
        sender: 'Maria Lopez',
        email: 'maria.lopez@gmail.com',
        to: ['reception@healthclinic.com'],
        cc: ['support@healthclinic.com'],
        bcc: ['support@healthclinic.com'],
        subject: 'Appointment Confirmation for Tomorrow',
        message:
          'Hi, I’ve confirmed my appointment with Dr. Anderson for tomorrow at 10:00 AM. Please let me know if I need to bring any documents.',
        time: '8:45 AM',
        date: '2025-10-15T08:45:00',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      },
      {
        id: 2,
        sender: 'Dr. Emily Turner',
        email: 'emily.turner@healthclinic.com',
        to: ['lab@healthclinic.com'],
        cc: ['john.miller@gmail.com'],
        bcc: [],
        subject: 'Follow-up: Patient Lab Results (John Miller)',
        message:
          'Please review the latest lab results for John Miller. Cholesterol level improved slightly, but sugar remains high.',
        time: '9:55 AM',
        date: '2025-10-15T09:55:00',
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
        email: 'inventory@healthclinic.com',
        to: ['pharmacy@healthclinic.com'],
        cc: ['admin@healthclinic.com'],
        bcc: [],
        subject: 'Medication Restock Request – Amoxicillin 500mg',
        message:
          'Stock for Amoxicillin 500mg is low (18 boxes remaining). Kindly approve reorder from MedLine supplier.',
        time: '10:35 AM',
        date: '2025-10-14T10:35:00',
        avatar: 'I',
      },
      {
        id: 4,
        sender: 'Mark Thompson',
        email: 'mark.thompson@hotmail.com',
        to: ['emily.turner@healthclinic.com'],
        cc: ['reception@healthclinic.com'],
        bcc: [],
        subject: 'Request to Reschedule Appointment',
        message:
          'Hi, I’d like to reschedule my appointment with Dr. Emily Turner originally set for October 13 at 3:00 PM. Can I move it to Friday morning instead?',
        time: '10:55 AM',
        date: '2025-10-14T10:55:00',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      },
      {
        id: 5,
        sender: 'Radiology Dept.',
        email: 'radiology@healthclinic.com',
        to: ['john.miller@gmail.com'],
        cc: [],
        bcc: [],
        subject: 'Reminder: Schedule Next MRI Exam',
        message: 'It’s time to schedule your next MRI exam.',
        time: '11:58 AM',
        date: '2025-10-14T11:58:00',
        avatar: 'R',
      },
      {
        id: 6,
        sender: 'Cinderella Poetri',
        email: 'cinderella.poetri@yahoo.com',
        to: ['dr.ramirez@healthclinic.com'],
        cc: ['reception@healthclinic.com'],
        bcc: [],
        subject: 'Appointment Confirmation: Physical Therapy',
        message:
          'Your physical therapy session with Dr. Ramirez on November 7th is confirmed. Please arrive 15 minutes early.',
        time: '1:00 PM',
        date: '2025-10-14T13:00:00',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      {
        id: 7,
        sender: 'Billing Department',
        email: 'billing@healthclinic.com',
        to: ['john.miller@gmail.com'],
        cc: ['accounts@healthclinic.com'],
        bcc: [],
        subject: 'Invoice Reminder: Payment Due',
        message: 'Reminder: Your invoice is due. Please submit payment.',
        time: '2:22 PM',
        date: '2025-10-14T14:22:00',
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
  openFullScreen?: boolean;
  setOpenFullScreen?: (open: boolean) => void;
};

const EmailLists = ({
  selectedSidebar,
  selectedEmail,
  setSelectedEmail,
  openAddEmail,
  setOpenAddEmail,
  openFullScreen,
  setOpenFullScreen,
}: IEmailListsProps) => {
  const { openModal, closeModal } = useModal();
  const showFullAddEmail = () => {
    openModal({
      view: (
        <AddNewEmail
          user_id={1}
          onClose={closeModal}
          onFullScreen={() => {
            setOpenAddEmail(true);
            closeModal();
          }}
          isFullScreen
        />
      ),
      customSize: '900px',
      size: 'xl',
    });
    setOpenAddEmail(false);
  };

  console.log(openAddEmail, openFullScreen);
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-20 items-center justify-between border-b p-5">
        <Flex
          className="w-full"
          justify={`${selectedSidebar ? 'between' : 'end'}`}
          align="center"
        >
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
        {openAddEmail && (
          <div
            className={`absolute bottom-0 right-[5%] h-[50%] w-[70%] transform overflow-auto rounded-xl bg-white shadow-xl transition-transform duration-300 ease-in-out ${
              openAddEmail ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {openAddEmail && (
              <AddNewEmail
                user_id={1}
                onClose={() => setOpenAddEmail(false)}
                onFullScreen={showFullAddEmail}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailLists;

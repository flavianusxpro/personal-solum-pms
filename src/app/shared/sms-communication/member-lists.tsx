import { Avatar, Text, Title } from 'rizzui';
import { AvatarWithBadge } from '@/core/ui/avatar';
import cn from '@/core/utils/class-names';

const MembersLayout = ({ onCloseMembers }: { onCloseMembers?: () => void }) => {
  const members = [
    {
      id: 1,
      name: 'Dr.Emily',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      isActive: true,
    },
    {
      id: 2,
      name: 'Isabella',
      avatar: '',
      isActive: false,
    },
  ];
  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto bg-white p-6"
      onClick={onCloseMembers}
    >
      <div>
        <Title
          as="h6"
          className={cn(
            'mb-2 truncate text-xs font-medium uppercase tracking-widest text-gray-500'
          )}
        >
          Member Lists
        </Title>
      </div>
      <div className="flex flex-col gap-3">
        {members.map((member, index) => (
          <div className="flex items-center gap-3" key={index}>
            {member.isActive == true ? (
              <AvatarWithBadge data={member} />
            ) : (
              <Avatar name={member.name} src={member.avatar} />
            )}
            <Text>{member.name}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersLayout;

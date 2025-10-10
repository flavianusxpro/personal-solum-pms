import { Avatar, Title } from 'rizzui';
import { DividerWithText } from '../ui/divider';
import RepliesMessage from './replies-message';
import cn from '@/core/utils/class-names';

const RepliesLayout = ({
  onCloseHandleReplies,
}: {
  onCloseHandleReplies?: () => void;
}) => {
  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto bg-white p-4"
      onClick={onCloseHandleReplies}
    >
      <div>
        <Title
          as="h6"
          className={cn(
            'mb-2 truncate text-xs font-medium uppercase tracking-widest text-gray-500 2xl:px-8'
          )}
        >
          Conversation
        </Title>
      </div>
      <div>
        <div className="flex flex-col items-start gap-3">
          <RepliesMessage
            name="Fajar Nugraha (Patient)"
            date="Oct 8 at 9:45 AM"
            message="Hi, just want to confirm if my consultation tomorrow at 9 AM is still scheduled?"
          />
          <DividerWithText
            text="Replies"
            borderColor="border-primary"
            textColor="text-primary"
          />
          <RepliesMessage
            isActiveUser
            name="Dr. Emily Rose"
            date="Oct 8 at 9:46 AM"
            message="Hello Mr. Fajar, yes it’s confirmed 😊 Your consultation is still on for 9 AM with Dr. Daniel Morgan. Please arrive 10 minutes early for registration."
          />
        </div>
      </div>
    </div>
  );
};

export default RepliesLayout;

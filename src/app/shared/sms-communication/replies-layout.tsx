import { Button, Flex, Title, Textarea } from 'rizzui';
import { DividerWithText } from '../ui/divider';
import RepliesMessage from './replies-message';
import cn from '@/core/utils/class-names';
import { PiPlusLight, PiSmileyLight, PiX } from 'react-icons/pi';
import { LuSend } from 'react-icons/lu';

const RepliesLayout = ({
  onCloseHandleReplies,
}: {
  onCloseHandleReplies?: () => void;
}) => {
  return (
    <div className="flex flex-1 flex-col gap-4 space-y-4 overflow-y-auto bg-white p-6">
      <div className="flex items-center justify-between">
        <Title
          as="h6"
          className={cn(
            'mb-2 truncate px-2 text-xs font-medium uppercase tracking-widest text-gray-500'
          )}
        >
          Conversation
        </Title>

        <PiX
          className="h-4 w-4 cursor-pointer"
          onClick={onCloseHandleReplies}
        />
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
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-300 p-4">
        <Textarea
          placeholder="Reply here..."
          className="!focus:ring-0 !focus:shadow-none !h-10 w-full !border-none !shadow-none !ring-0"
          textareaClassName="!focus:ring-0 w-full !border-none !shadow-none !ring-0 !focus:shadow-none !h-10"
          size="sm"
        />
        <Flex justify="between" align="center">
          <Flex>
            <PiPlusLight className="h-4 w-4" />
            <PiSmileyLight className="h-4 w-4" />
          </Flex>

          <Button className="w-auto text-white" size="sm">
            <LuSend className="me-1.5 h-4 w-4" />
            Send
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default RepliesLayout;

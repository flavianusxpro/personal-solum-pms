import { Avatar, Badge } from 'rizzui';
type IProps = {
  isActiveUser?: boolean;
  name: string;
  date: string;
  message: string;
  handleReplies?: () => void;
  isReplies?: boolean;
};
const RepliesMessage = ({
  isActiveUser,
  name,
  date,
  message,
  handleReplies,
  isReplies = false,
}: IProps) => {
  return (
    <div className="flex items-center gap-2">
      {isActiveUser ? (
        <div className="relative inline-flex">
          <Avatar
            name="Jane Doe"
            src="https://randomuser.me/api/portraits/women/40.jpg"
          />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            size="lg"
            className="absolute bottom-0 right-0 -translate-y-[25%]"
          />
        </div>
      ) : (
        <Avatar
          name="John Doe"
          initials="AB"
          src="https://randomuser.me/api/portraits/women/40.jpg"
        />
      )}

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">{name}</span>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
          <p>{message}</p>
        </div>
        {isReplies && (
          <div
            className="flex cursor-pointer gap-6 text-xs"
            onClick={handleReplies}
          >
            <span className="font-medium text-primary">+2 replies</span>
            <span>view conversations {`>`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepliesMessage;

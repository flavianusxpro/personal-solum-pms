import { Avatar, Badge, AvatarProps } from 'rizzui';
type IProps = {
  isActiveUser?: boolean;
  name: string;
  photo?: string;
  date: string;
  message: string;
  handleReplies?: () => void;
  isReplies?: boolean;
  color?: any;
  className?: string;
  messageClassName?: string;
  divMessageClassName?: string;
} & AvatarProps;
const RepliesMessage = ({
  isActiveUser,
  name,
  photo,
  date,
  message,
  handleReplies,
  isReplies = false,
  color,
  className,
  messageClassName,
  divMessageClassName,
}: IProps) => {
  return (
    <div className="flex items-center gap-2">
      {isActiveUser ? (
        <div className="relative inline-flex">
          <Avatar name={name} src={photo} color={color} className={className} />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            size="lg"
            className="absolute bottom-0 right-0 -translate-y-[25%]"
          />
        </div>
      ) : (
        <Avatar name={name} src={photo} color={color} className={className} />
      )}

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <span className="font-semibold">{name}</span>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
          <div className={divMessageClassName}>
            <p className={`rounded-lg p-3 ${messageClassName}`}>{message}</p>
          </div>
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

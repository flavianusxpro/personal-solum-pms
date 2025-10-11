import { Avatar, Badge } from 'rizzui';

export const AvatarWithBadge = ({ data, size }: any) => {
  return (
    <div className="relative inline-flex">
      <Avatar name={data.name} src={data.avatar} size={size} />
      <Badge
        renderAsDot
        color="success"
        enableOutlineRing
        size="lg"
        className="absolute bottom-0 right-0 -translate-y-[25%]"
      />
    </div>
  );
};

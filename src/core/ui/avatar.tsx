import { Avatar, Badge } from 'rizzui';

export const AvatarWithBadge = ({ data }: any) => {
  return (
    <div className="relative inline-flex">
      <Avatar name={data.name} src={data.avatar} />
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

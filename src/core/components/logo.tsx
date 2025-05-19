import Image from 'next/image';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={'/solum.jpeg'} alt="logo" width={100} height={100} />;
}

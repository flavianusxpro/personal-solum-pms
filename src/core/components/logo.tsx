import Image from 'next/image';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return <Image src={'/solum.jpeg'} alt="logo" width={100} height={100} />;
}

import Image from 'next/image';
import * as icons from './icons';

export type IconName = keyof typeof icons;

type IconProps = {
    className?: string;
    name: IconName;
};

export const Icon = (props: IconProps) => {
    const {name, className} = props;
    return <Image className={className} width={16} height={16} alt={`icon ${props.name}`} src={icons[props.name]} />;
};

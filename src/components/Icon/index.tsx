import Image from 'next/image';
import * as icons from './icons';

export type IconName = keyof typeof icons;

type IconProps = {
    className?: string;
    name: IconName;
};

export const Icon = (props: IconProps) => {
    return (
        <Image className={props.className} width={16} height={16} alt={`icon ${props.name}`} src={icons[props.name]} />
    );
};

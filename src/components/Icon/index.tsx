import Image from 'next/image';
import * as icons from './icons';

export type IconName = keyof typeof icons;

type IconProps = {
    className?: string;
    name: IconName;
    size?: 's' | 'm' | 'l';
};

const SIZE_MAP = {
    s: 16,
    m: 24,
    l: 32,
};

export const Icon = (props: IconProps) => {
    const {className, name, size = 's'} = props;
    return (
        <Image
            className={className}
            width={SIZE_MAP[size]}
            height={SIZE_MAP[size]}
            alt={`icon ${name}`}
            src={icons[name]}
        />
    );
};

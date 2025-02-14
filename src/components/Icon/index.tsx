import * as icons from './icons';
import css from './Icon.module.scss';
import classNames from 'classnames';

export type IconName = keyof typeof icons;

type Color = 'brand' | 'white';

export type IconProps = {
    className?: string;
    name: IconName;
    color?: Color;
    size?: 'xs' | 's' | 'sm' | 'm' | 'l';
    onClick?: () => void;
};

const SIZE_MAP = {
    xs: 12,
    s: 16,
    sm: 20,
    m: 24,
    l: 32,
};

export const Icon = (props: IconProps) => {
    const {className, color, name, size = 's', onClick} = props;

    const IconCmp = icons[name];

    return (
        <IconCmp
            className={classNames(css.icon, className, {[css[`color-${color}`]]: true})}
            onClick={onClick}
            width={SIZE_MAP[size]}
            height={SIZE_MAP[size]}
            preserveAspectRatio="xMidYMid meet"
        />
    );
};

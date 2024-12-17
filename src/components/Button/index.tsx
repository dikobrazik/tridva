import {ComponentProps, PropsWithChildren} from 'react';
import cn from 'classnames';
import css from './Button.module.scss';
import {Icon, IconName, IconProps} from '../Icon';
import {Box} from '../layout/Box';
import {UnitProps} from '../layout/types';
import Link from 'next/link';

export type ButtonVariant = 'action' | 'action-white' | 'normal' | 'pseudo' | 'outline' | 'alert' | 'green';

type ButtonProps = {
    variant?: ButtonVariant;
    icon?: IconName;
    size?: 'xs' | 's' | 'm' | 'l';
    iconSize?: IconProps['size'];
    width?: 'auto' | 'full' | UnitProps<'button'>['width'];
};

type Props = PropsWithChildren<ButtonProps> & UnitProps<'button'>;

export const Button = (props: Props) => {
    const {variant = 'action', size = 'l', width, children, icon, iconSize, className, ...buttonProps} = props;

    const isFullWidth = width === 'full';

    return (
        <Box
            as="button"
            gap="2"
            className={cn(
                css.button,
                css[`variant-${variant}`],
                css[`size-${size}`],
                {
                    [css.fullWidth]: isFullWidth,
                },
                className,
            )}
            width={width === 'full' ? undefined : width}
            {...buttonProps}
        >
            {children}
            {icon && <Icon className={css.icon} name={icon} size={iconSize} />}
        </Box>
    );
};

export const LinkButton = (props: ComponentProps<typeof Link> & ButtonProps) => {
    const {variant = 'action', size = 'l', width, children, icon, iconSize, className, href, ...linkProps} = props;

    const isFullWidth = width === 'full';

    return (
        <Link
            className={cn(
                css.linkButton,
                css[`variant-${variant}`],
                css[`size-${size}`],
                {
                    [css.fullWidth]: isFullWidth,
                },
                className,
            )}
            href={href}
            {...linkProps}
        >
            {children}
            {icon && <Icon className={css.icon} name={icon} size={iconSize} />}
        </Link>
    );
};

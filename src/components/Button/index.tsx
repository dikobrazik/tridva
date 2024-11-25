import {PropsWithChildren} from 'react';
import cn from 'classnames';
import css from './Button.module.scss';
import {Icon, IconName, IconProps} from '../Icon';
import {Box} from '../layout/Box';
import {UnitProps} from '../layout/types';

type Props<As extends 'button' | 'a'> = PropsWithChildren<{
    variant?: 'action' | 'action-white' | 'normal' | 'pseudo' | 'outline';
    icon?: IconName;
    size?: 'xs' | 's' | 'm' | 'l';
    iconSize?: IconProps['size'];
    width?: 'auto' | 'full';
}> &
    UnitProps<As>;

export const Button = <As extends 'button' | 'a'>(props: Props<As>) => {
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
            {...buttonProps}
        >
            {children}
            {icon && <Icon className={css.icon} name={icon} size={iconSize} />}
        </Box>
    );
};

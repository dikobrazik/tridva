import {PropsWithChildren} from 'react';
import cn from 'classnames';
import css from './Button.module.scss';
import {Icon, IconName, IconProps} from '../Icon';
import {Box} from '../layout/Box';
import {UnitProps} from '../layout/types';

type Props = PropsWithChildren<{
    variant?: 'action' | 'normal' | 'pseudo' | 'outline';
    icon?: IconName;
    size?: 'l' | 'm';
    iconSize?: IconProps['size'];
    width?: 'auto' | 'full';
}> &
    UnitProps<'button'>;

export const Button = (props: Props) => {
    const {variant = 'action', size = 'l', width, children, icon, iconSize, ...buttonProps} = props;

    return (
        <Box
            as="button"
            gap="2"
            className={cn(css.button, css[`variant-${variant}`], css[`size-${size}`], {
                [css.fullWidth]: width === 'full',
            })}
            {...buttonProps}
        >
            {children}
            {icon && <Icon className={css.icon} name={icon} size={iconSize} />}
        </Box>
    );
};

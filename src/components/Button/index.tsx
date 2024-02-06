import {ButtonHTMLAttributes, PropsWithChildren} from 'react';
import cn from 'classnames';
import css from './Button.module.scss';

type Props = PropsWithChildren<{
    variant?: 'action';
}> &
    ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
    const {variant = 'action', children, ...buttonProps} = props;

    return (
        <button className={cn(css.button, css[`variant-${variant}`])} {...buttonProps}>
            {children}
        </button>
    );
};

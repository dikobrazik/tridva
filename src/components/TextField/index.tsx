'use client';

import cn from 'classnames';
import {forwardRef, InputHTMLAttributes} from 'react';
import {Icon, IconName} from '../Icon';
import css from './TextField.module.scss';

export type TextFieldProps = {
    variant?: 'default' | 'red';
    size?: 's' | 'm';
    icon?: IconName;
    onChange?: (value: string) => void;
    onIconClick?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props: TextFieldProps, ref) => {
    const {icon, variant = 'default', size = 's', onChange = () => {}, onIconClick, className, ...inputProps} = props;

    return (
        <span className={css.container}>
            <input
                ref={ref}
                name="search"
                type="search"
                autoComplete="off"
                onChange={e => onChange(e.target.value)}
                {...inputProps}
                className={cn(css.input, className, css[`size-${size}`], css[`variant-${variant}`])}
            />
            {icon && <Icon className={css.icon} name={icon} size="sm" onClick={onIconClick} />}
        </span>
    );
});

TextField.displayName = 'TextField';

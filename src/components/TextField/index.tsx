'use client';

import {forwardRef, InputHTMLAttributes, useEffect, useRef} from 'react';
import cn from 'classnames';
import {Icon, IconName} from '../Icon';
import css from './TextField.module.scss';
import IMask, {InputMask} from 'imask';

export type TextFieldProps = {
    size?: 's' | 'm';
    icon?: IconName;
    onChange?: (value: string) => void;
    onIconClick?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props: TextFieldProps, ref) => {
    const {icon, size = 's', onChange = () => {}, onIconClick, ...inputProps} = props;

    return (
        <span className={css.container}>
            <input
                ref={ref}
                name="search"
                type="search"
                autoComplete="off"
                onChange={e => onChange(e.target.value)}
                className={cn(css.input, css[`size-${size}`])}
                {...inputProps}
            />
            {icon && <Icon className={css.icon} name={icon} onClick={onIconClick} />}
        </span>
    );
});

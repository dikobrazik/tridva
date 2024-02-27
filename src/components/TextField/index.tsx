import {InputHTMLAttributes} from 'react';
import cn from 'classnames';
import {Icon, IconName} from '../Icon';
import css from './TextField.module.scss';

type Props = {
    size?: 's' | 'm';
    icon?: IconName;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const TextField = (props: Props) => {
    const {icon, size = 's', ...inputProps} = props;

    return (
        <span className={css.container}>
            <input {...inputProps} className={cn(css.input, css[`size-${size}`])} name="search" type="search" />
            {icon && <Icon className={css.icon} name={icon} />}
        </span>
    );
};

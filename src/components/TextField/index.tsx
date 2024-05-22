import {InputHTMLAttributes} from 'react';
import cn from 'classnames';
import {Icon, IconName} from '../Icon';
import css from './TextField.module.scss';

type Props = {
    size?: 's' | 'm';
    icon?: IconName;
    onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

export const TextField = (props: Props) => {
    const {icon, size = 's', onChange = () => {}, ...inputProps} = props;

    return (
        <span className={css.container}>
            <input
                name="search"
                type="search"
                onChange={e => onChange(e.target.value)}
                className={cn(css.input, css[`size-${size}`])}
                {...inputProps}
            />
            {icon && <Icon className={css.icon} name={icon} />}
        </span>
    );
};

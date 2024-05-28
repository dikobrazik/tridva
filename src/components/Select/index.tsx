import {SelectHTMLAttributes} from 'react';
import cn from 'classnames';
import {Icon} from '../Icon';
import css from './Select.module.scss';

type Option = {id: number | string; name: string};

type Props = {
    size?: 's' | 'm';
    onChange?: (value: string) => void;
    options: Option[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'>;

export const Select = (props: Props) => {
    const {options, size = 's', onChange = () => {}, ...selectProps} = props;

    return (
        <span className={css.container}>
            <select
                onChange={e => onChange(e.target.value)}
                className={cn(css.select, css[`size-${size}`])}
                {...selectProps}
            >
                {options.map(({id, name}) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))}
            </select>
            <Icon className={css.icon} name="chevronDown" />
        </span>
    );
};

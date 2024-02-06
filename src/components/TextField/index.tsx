import {InputHTMLAttributes} from 'react';
import {Icon, IconName} from '../Icon';
import css from './TextField.module.scss';

type Props = {
    icon?: IconName;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = (props: Props) => {
    const {icon, ...inputProps} = props;

    return (
        <span className={css.container}>
            <input
                {...inputProps}
                className={css.input}
                name="search"
                placeholder="Искать товары и категории"
                type="search"
            />
            {icon && <Icon className={css.icon} name={icon} />}
        </span>
    );
};

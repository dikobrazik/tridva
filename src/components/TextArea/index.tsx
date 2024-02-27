import {TextareaHTMLAttributes} from 'react';
import cn from 'classnames';
import css from './TextField.module.scss';

type Props = {
    size?: 's' | 'm';
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

export const TextArea = (props: Props) => {
    const {size = 's', ...inputProps} = props;

    return (
        <span className={css.container}>
            <textarea {...inputProps} className={cn(css.input, css[`size-${size}`])} name="search" />
        </span>
    );
};

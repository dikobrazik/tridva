'use client';

import Image from 'next/image';
import css from './Checkbox.module.scss';
import checkImg from './check.svg?url';
import cn from 'classnames';

type Props = {
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export const Checkbox = (props: Props) => {
    const {checked, onChange} = props;

    return (
        <label className={cn(css.label, {[css.cheked]: Boolean(checked)})}>
            <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
            {checked && <Image src={checkImg} width={10} height={8} alt="checked" />}
        </label>
    );
};

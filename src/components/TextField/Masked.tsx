'use client';

import IMask, {InputMask} from 'imask';
import {useEffect, useRef} from 'react';
import {TextField, TextFieldProps} from '.';

type Props = {
    mask: string;
} & TextFieldProps;

export const MaskedTextField = ({onChange, mask, ...props}: Props) => {
    const maskedRef = useRef<InputMask | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            maskedRef.current = IMask(inputRef.current, {
                mask,
                lazy: false,
            });

            maskedRef.current.updateValue();

            maskedRef.current.on('accept', e => {
                if (maskedRef.current !== null) {
                    if (onChange) {
                        onChange(maskedRef.current.unmaskedValue);
                    }
                }
            });
        }
    }, []);

    const value = maskedRef.current?.value ?? '';

    return <TextField ref={inputRef} {...props} type="text" value={value} />;
};

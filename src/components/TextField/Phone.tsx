'use client';

import IMask, {InputMask} from 'imask';
import {useEffect, useRef} from 'react';
import {TextField, TextFieldProps} from '.';

export const PhoneTextField = ({onChange, ...props}: TextFieldProps) => {
    const maskedRef = useRef<InputMask | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            maskedRef.current = IMask(inputRef.current, {
                mask: '+7 (000) 000-00-00',
                lazy: false,
            });

            maskedRef.current.value = String(props.value).replace(/^8/, '+7');
            maskedRef.current.updateValue();

            maskedRef.current.on('accept', e => {
                if (maskedRef.current !== null) {
                    if (e?.inputType === 'insertFromPaste') {
                        const insertData = e.data ?? '';
                        maskedRef.current.value = insertData.replace(/^8/, '+7');
                    }
                    if (maskedRef.current.unmaskedValue === '8') {
                        maskedRef.current.value = '';
                    }

                    if (onChange) {
                        onChange(maskedRef.current.unmaskedValue);
                    }
                }
            });
        }
    }, []);

    const value = maskedRef.current?.value ?? '';

    return <TextField ref={inputRef} {...props} value={value} />;
};

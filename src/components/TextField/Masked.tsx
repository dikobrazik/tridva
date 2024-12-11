'use client';

import {FactoryOpts} from 'imask';
import {TextField, TextFieldProps} from '.';
import {useIMask} from 'react-imask';

export const MaskedTextField = ({maskOptions, defaultValue, ...props}: TextFieldProps & {maskOptions: FactoryOpts}) => {
    const {ref, value, setValue} = useIMask<HTMLInputElement>(maskOptions, {
        onAccept: (value, maskRef) => props.onChange && props.onChange(maskRef.unmaskedValue),
        defaultValue: defaultValue ? defaultValue.toString() : undefined,
    });

    return <TextField ref={ref} {...props} value={value} onChange={setValue} />;
};

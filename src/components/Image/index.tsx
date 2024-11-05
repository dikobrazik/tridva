'use client';

import React, {ComponentProps, useEffect, useState} from 'react';
import Image from 'next/image';

type Props = ComponentProps<typeof Image> & {fallbackSrc?: string};

const ImageWithFallback = (props: Props) => {
    const {src, fallbackSrc, ...rest} = props;
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            alt={rest.alt ?? ''}
            src={imgSrc}
            onError={
                fallbackSrc
                    ? () => {
                          setImgSrc(fallbackSrc);
                      }
                    : undefined
            }
        />
    );
};

export default ImageWithFallback;

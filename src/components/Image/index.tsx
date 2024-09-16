'use client';

import React, {ComponentProps, useState} from 'react';
import Image from 'next/image';

type Props = ComponentProps<typeof Image> & {fallbackSrc?: string};

const ImageWithFallback = (props: Props) => {
    const {src, fallbackSrc, ...rest} = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
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

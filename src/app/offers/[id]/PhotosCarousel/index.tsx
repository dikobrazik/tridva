'use client';

import Image from 'next/image';
import css from './PhotosCarousel.module.scss';
import {formatOfferPhotoLink} from '@/shared/photos';
import {useScrollPosition} from '@/hooks/useScrollPosition';
import {Box} from '@/components/layout/Box';

type Props = {
    photos: string[];
};

export const PhotosCarousel = ({photos}: Props) => {
    const {refCallback, scrollPosition} = useScrollPosition();

    return (
        <Box position="relative">
            <div ref={refCallback} className={css.imagesContainer}>
                {photos?.map((photo, index) => (
                    <Image
                        key={index}
                        aria-colindex={index}
                        className={css.image}
                        src={formatOfferPhotoLink(photo)}
                        width={700}
                        height={700}
                        priority={index < 2}
                        alt="offer image"
                    />
                ))}
            </div>
            {photos.length > 1 && (
                <Box className={css.counter}>
                    {scrollPosition} / {photos.length}
                </Box>
            )}
        </Box>
    );
};

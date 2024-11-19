'use client';

import Image from 'next/image';
import css from './PhotosCarousel.module.scss';
import {formatOfferPhotoLink} from '@/shared/photos';
import {useScrollPosition} from '@/hooks/useScrollPosition';
import {Box} from '@/components/layout/Box';
import {OfferPhoto} from '@/types/offers';

type Props = {
    photos: OfferPhoto;
};

export const PhotosCarousel = ({photos}: Props) => {
    const {refCallback, scrollPosition} = useScrollPosition();

    return (
        <Box position="relative" margin="0 -16px">
            <div ref={refCallback} className={css.imagesContainer}>
                {Array(photos.photosCount)
                    .fill(undefined)
                    .map((_, index) => (
                        <Image
                            key={index}
                            aria-colindex={index}
                            className={css.image}
                            src={formatOfferPhotoLink(new URL(`${index}`, photos.photoBaseUrl).href)}
                            width={700}
                            height={700}
                            priority={index < 2}
                            alt="offer image"
                        />
                    ))}
            </div>
            {photos.photosCount > 1 && (
                <Box className={css.counter}>
                    {scrollPosition} / {photos.photosCount}
                </Box>
            )}
        </Box>
    );
};

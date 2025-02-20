'use client';

import Image from 'next/image';
import css from './PhotosCarousel.module.scss';
import {formatOfferPhotoLink} from '@/shared/photos';
import {useScrollPosition} from '@/hooks/useScrollPosition';
import {Box} from '@/components/layout/Box';
import {OfferPhoto} from '@/types/offers';
import {useToggler} from '@/hooks/useToggler';
import classNames from 'classnames';
import {Button} from '@/components/Button';
import {usePageScrollable} from '@/hooks/usePageScrollable';

type Props = {
    photos: OfferPhoto;
};

export const PhotosCarousel = ({photos}: Props) => {
    const {turnOnScroll, turnOffScroll} = usePageScrollable();
    const {isActive: isFullscreen, toggleOff, toggleOn} = useToggler();
    const {refCallback, scrollPosition} = useScrollPosition();

    const onImageClick = () => {
        toggleOn();
        turnOffScroll();
    };

    const onCloseFullscreenClick = () => {
        toggleOff();
        turnOnScroll();
    };

    return (
        <Box position="relative" margin="0 -16px" className={classNames({[css.fullScreen]: isFullscreen})}>
            {isFullscreen && (
                <Button variant="normal" size="s" iconSize="m" icon="close" onClick={onCloseFullscreenClick} />
            )}
            <div
                ref={refCallback}
                className={css.imagesContainer}
                onClick={e => {
                    if (e.target === e.currentTarget) {
                        onCloseFullscreenClick();
                    }
                }}
            >
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
                            onClick={onImageClick}
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

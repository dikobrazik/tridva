import {Offer} from '@/types/offers';
import duck from './duck.png';

type PhotoSize = 140 | 280 | 400 | 700 | 1600;

const PHOTO_SIZE_FILE_NAME: Record<PhotoSize, string> = {
    140: '140.jpg',
    280: '280.jpg',
    400: '400.jpg',
    700: '700-nw.jpg',
    1600: '1600.jpg',
};

export const getFirstOfferPhoto = (offerPhoto: Offer['photos'], size: PhotoSize = 700) => {
    return offerPhoto.photosCount ? formatOfferPhotoLink(new URL(`0`, offerPhoto.photoBaseUrl).href, size) : duck;
};

export const formatOfferPhotoLink = (photo: string, size: PhotoSize = 700) => {
    return `${photo}/${PHOTO_SIZE_FILE_NAME[size]}`;
};

import {Offer} from '@/types/offers';
import duck from './duck.png';

export const getFirstOfferPhoto = (photos: Offer['photos'], size: number = 700) => {
    return photos?.length ? formatOfferPhotoLink(photos[0], size) : duck;
};

export const formatOfferPhotoLink = (photo: string, size: number = 700) => {
    return `${photo}/${size}.jpg`;
};

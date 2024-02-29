import {Offer} from '@/types/offers';
import duck from './duck.png';

export const getOfferPhoto = (photos: Offer['photos'], size: number = 700) => {
    return photos?.length ? `${photos[0]}/${size}.jpg` : duck;
};

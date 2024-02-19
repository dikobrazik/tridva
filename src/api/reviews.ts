import {Review} from '@/types/review';
import axios from 'axios';

type LoadReviewsPayload = {
    offerId: number;

    page?: number;
    pageSize?: number;
};

export const loadReviews = (payload: LoadReviewsPayload): Promise<Review[]> =>
    axios<Review[]>(`reviews/${payload.offerId}`)
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

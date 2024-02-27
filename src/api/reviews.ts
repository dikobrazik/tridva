import {Review} from '@/types/review';
import axios from 'axios';

type LoadReviewsPayload = {
    offerId: number;

    page?: number;
    pageSize?: number;
};

type CreateReviewPayload = {
    offerId: number;

    text: string;
    rating: number;
};

export const loadReviews = (payload: LoadReviewsPayload): Promise<Review[]> =>
    axios<Review[]>(`offers/${payload.offerId}/reviews`)
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

export const createReview = ({offerId, ...body}: CreateReviewPayload): Promise<Review[]> =>
    axios
        .post(`offers/${offerId}/reviews`, body)
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return {};
        });

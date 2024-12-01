/* eslint-disable no-console */
import {Review} from '@/types/review';
import axios, {AxiosError} from 'axios';

type LoadReviewsPayload = {
    offerId: number;

    page?: number;
    pageSize?: number;
};

type LoadHasReviewPayload = {
    offerId: number;
};

type CreateReviewPayload = {
    offerId: number;

    text: string;
    rating: number;
};

export const loadReviews = ({offerId, page, pageSize}: LoadReviewsPayload): Promise<Review[]> =>
    axios<Review[]>(`offers/${offerId}/reviews`, {params: {page, pageSize}})
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

export const loadHasReview = ({offerId}: LoadHasReviewPayload): Promise<boolean> =>
    axios<boolean>(`offers/${offerId}/has-review`)
        .then(response => response.data)
        .catch((e: AxiosError) => {
            if (e.response?.status !== 401) {
                console.log(e);
            }
            return false;
        });

export const createReview = ({offerId, ...body}: CreateReviewPayload): Promise<void> =>
    axios
        .post(`offers/${offerId}/reviews`, body)
        .then(response => response.data)
        .catch(e => {
            console.log(e);
        });

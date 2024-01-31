import {Category} from '@/types/category';
import axios from 'axios';

type LoadOffersPayload = {
    level?: number;
};

export const loadCategories = (payload: LoadOffersPayload = {level: 1}): Promise<Category[]> =>
    axios<Category[]>('categories', {params: payload})
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

import {Category} from '@/types/category';
import axios from 'axios';

type LoadCategoriesPayload = {
    level?: number;
};

type LoadCategoryPayload = {
    categoryId: number;
};

export const loadCategories = (payload: LoadCategoriesPayload = {level: 1}): Promise<Category[]> =>
    axios<Category[]>('categories', {params: payload})
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

export const loadCategory = (payload: LoadCategoryPayload): Promise<Category> =>
    axios<Category>(`categories/${payload.categoryId}`, {params: payload})
        .then(response => response.data)
        .catch(() => ({} as Category));

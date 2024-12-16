/* eslint-disable no-console */
import {Category} from '@/types/category';
import axios from 'axios';

type LoadCategoriesPayload = {
    level?: number;
};
type LoadCategoriesByNamePayload = {
    name: string;
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

export const loadCategoriesByName = (payload: LoadCategoriesByNamePayload): Promise<Category[]> =>
    axios<Category[]>('categories', {params: payload})
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

export const loadPopularCategories = (): Promise<Pick<Category, 'id' | 'name'>[]> =>
    axios<Category[]>('categories/popular')
        .then(response => response.data)
        .catch(e => {
            console.log(e);

            return [];
        });

export const loadCategory = (payload: LoadCategoryPayload): Promise<Category> =>
    axios<Category>(`categories/${payload.categoryId}`, {params: payload})
        .then(response => response.data)
        .catch(() => ({}) as Category);

export const loadIsPopularCategory = (payload: LoadCategoryPayload): Promise<boolean> =>
    axios<boolean>(`categories/${payload.categoryId}/is-popular`, {params: payload})
        .then(response => response.data)
        .catch(() => false);

export const loadCategoryAncestors = (payload: LoadCategoryPayload): Promise<Category[]> =>
    axios<Category[]>(`categories/${payload.categoryId}/ancestors`, {params: payload})
        .then(response => response.data)
        .catch(() => [] as Category[]);

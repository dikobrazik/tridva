import {BasketItem} from '@/types/basket';
import axios from 'axios';

export const createAnonymousUser = (): Promise<{access_token: string}> =>
    axios.post('auth/anonymous').then(response => response.data);

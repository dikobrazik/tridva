import {BaseStorage} from './base-storage';

export const selectedBasketItemsStorage = new BaseStorage<number[]>('selected-basket-items-for-checkout');
export const lastSelectedPickupPointIdStorage = new BaseStorage<number>('selected-pickup-point-id');

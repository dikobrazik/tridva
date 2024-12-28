import {addSpacesToNumber} from './numberWithSpaces';

export function calculatePrice(price: string | number, discount?: number) {
    return Math.ceil(discount ? Number(price) / (1 + discount / 100) : Number(price));
}

export function formatPrice(price: string | number, discount?: number) {
    return addSpacesToNumber(calculatePrice(price, discount));
}

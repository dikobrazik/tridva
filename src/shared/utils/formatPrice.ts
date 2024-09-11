import {addSpacesToNumber} from './numberWithSpaces';

export function formatPrice(price: string | number, discount?: number) {
    return addSpacesToNumber(Math.ceil(discount ? Number(price) - Number(price) * (discount / 100) : Number(price)));
}

import {ORDER_STATUS_MAP} from '@/shared/constants/order-status';
import {PickupPoint} from '../geo';
import {Offer} from '../offers';

export type Order = {
    id: number;
    createdAt: string;
    updatedAt: string;
    pickupPoint: PickupPoint;
    items: OrderItem[];
};

export type OrderItem = {
    isGroupItem: boolean;
    offer: Pick<Offer, 'id' | 'title' | 'discount' | 'price' | 'photos'>;
    status: Values<typeof ORDER_STATUS_MAP>;
    count: number;
};

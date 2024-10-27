export type Offer = {
    id: number;
    title: string;
    simaid: number;
    sid: number;
    description: string;
    price: string;
    discount?: number;
    photos?: string[];
    categoryId: number;
    ordersCount: number;
    rating?: number;
    reviewsCount: number;
    groupsCount: number;
};

export type OfferAttribute = {
    id: number;
    attributeName: string;
    value: string;
};

export type Offer = {
    id: number;
    title: string;
    description: string;
    price: string;
    discount?: number;
    photos?: string[];
    categoryId: number;
    rating?: number;
    reviewsCount: number;
    groupsCount: number;
};

export type OfferAttribute = {
    id: number;
    attributeName: string;
    value: string;
};

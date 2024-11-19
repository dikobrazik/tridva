export type Offer = {
    id: number;
    title: string;
    simaid: number;
    sid: number;
    description: string;
    price: string;
    discount?: number;
    photos: OfferPhoto;
    categoryId: number;
    ordersCount: number;
    rating?: number;
    ratingsCount: number;
    reviewsCount: number;
    groupsCount: number;
};

export type OfferAttribute = {
    id: number;
    attributeName: string;
    value: string;
};

export type OfferPhoto = {
    id: number;
    offerId: number;
    photoBaseUrl: string;
    photosCount: number;
};

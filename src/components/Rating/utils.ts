import {IconName} from '../Icon';

export const getIconsForRating = (rating: number): IconName[] => {
    const fullStarsCount = Math.floor(rating);
    const halfStarsCount = rating % 1 > 0;
    const emptyStarsCount = 5 - (fullStarsCount + halfStarsCount);

    const fullStars = Array(fullStarsCount)
        .fill(undefined)
        .map(() => 'star');

    const halfStars = halfStarsCount ? ['halfStar'] : [];
    const emptyStars = Array(emptyStarsCount)
        .fill(undefined)
        .map(() => 'emptyStar');

    return fullStars.concat(halfStars, emptyStars);
};

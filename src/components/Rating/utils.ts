import {IconName} from '../Icon';

export const getIconsForRating = (rating: number): IconName[] => {
    const fullStarsCount = Math.floor(rating);
    const halfStarsCount = rating % 1 > 0 ? 1 : 0;
    const emptyStarsCount = 5 - (fullStarsCount + halfStarsCount);

    const fullStars = Array(fullStarsCount)
        .fill(undefined)
        .map(() => 'star' as IconName);

    const halfStars = halfStarsCount ? ['halfStar' as IconName] : [];
    const emptyStars = Array(emptyStarsCount)
        .fill(undefined)
        .map(() => 'emptyStar' as IconName);

    return fullStars.concat(halfStars, emptyStars);
};

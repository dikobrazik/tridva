'use client';

import {noop} from '@/shared/utils/noop';
import {Icon, IconProps} from '../Icon';
import {Row} from '../layout/Row';
import {getIconsForRating} from './utils';

type Props = {
    iconSize?: IconProps['size'];
    rating: number;
    onChange?: (rating: number) => void;
};

export const Rating = (props: Props) => {
    const {iconSize, rating, onChange = noop} = props;

    return (
        <Row>
            {getIconsForRating(rating).map((iconName, index) => (
                <Icon size={iconSize} key={String(index)} name={iconName} onClick={() => onChange(index + 1)} />
            ))}
        </Row>
    );
};

import {Icon} from '../Icon';
import {Row} from '../layout/Row';
import {getIconsForRating} from './utils';

type Props = {
    rating: number;
};

export const Rating = (props: Props) => {
    const {rating} = props;
    return (
        <Row>
            {getIconsForRating(rating).map((iconName, index) => (
                <Icon key={String(index)} name={iconName} />
            ))}
        </Row>
    );
};

import {Icon} from '../Icon';
import {Row} from '../layout/Row';

type Props = {
    rating: number;
};

export const Rating = (props: Props) => {
    const {rating} = props;
    return (
        <Row>
            {Array(Math.floor(rating))
                .fill(undefined)
                .map((_, index) => (
                    <Icon key={String(index)} name="star" />
                ))}
        </Row>
    );
};

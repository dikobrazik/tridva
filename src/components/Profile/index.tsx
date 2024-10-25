import {Row} from '../layout/Row';
import {Text} from '../Text';
import {Avatar} from '../Avatar';

type Props = {id?: number; name: string};

export const Profile = (props: Props) => {
    return (
        <Row gap="2" alignItems="center">
            <Avatar id={props.id} width={24} height={24} />
            <Text weight={500}>{props.name}</Text>
        </Row>
    );
};

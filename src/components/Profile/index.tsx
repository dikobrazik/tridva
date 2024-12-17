import {Row} from '../layout/Row';
import {Text} from '../Text';
import {RandomAvatar} from '../Avatar';

type Props = {id?: number; name: string};

export const Profile = (props: Props) => {
    return (
        <Row gap="2" alignItems="center">
            <RandomAvatar id={props.id} width={24} height={24} />
            <Text weight={500}>{props.name}</Text>
        </Row>
    );
};

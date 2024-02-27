import Image from 'next/image';
import {Row} from '../layout/Row';

type Props = {name: string};

export const Profile = (props: Props) => {
    return (
        <Row gap="2" alignItems="center">
            <Image src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png" width="24" height="24" alt="avatar" />
            {props.name}
        </Row>
    );
};

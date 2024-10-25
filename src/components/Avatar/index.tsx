import Image from 'next/image';
import {Box} from '../layout/Box';
import avatar1 from './assets/adventurerNeutral-1716375770632.svg';
import avatar2 from './assets/adventurerNeutral-1716375774300.svg';
import avatar3 from './assets/adventurerNeutral-1716375776764.svg';
import avatar4 from './assets/adventurerNeutral-1716375781278.svg';
import avatar5 from './assets/adventurerNeutral-1716375784996.svg';
import avatar6 from './assets/adventurerNeutral-1716375788262.svg';
import avatar7 from './assets/adventurerNeutral-1716375791329.svg';
import avatar8 from './assets/adventurerNeutral-1716375794512.svg';
import avatar9 from './assets/adventurerNeutral-1716375799213.svg';
import avatar10 from './assets/adventurerNeutral-1716375802063.svg';
import avatar11 from './assets/adventurerNeutral-1716375804680.svg';
import avatar12 from './assets/adventurerNeutral-1716375808764.svg';

const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
];

type Props = {
    id?: number;

    height?: number;
    width?: number;
};

export const Avatar = (props: Props) => {
    return (
        <Box>
            <Image
                height={props.height ?? 76}
                width={props.width ?? 76}
                alt="avatar"
                src={avatars[(props.id ?? 0) % (avatars.length - 1)]}
            />
        </Box>
    );
};

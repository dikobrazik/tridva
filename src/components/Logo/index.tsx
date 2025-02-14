import Image from 'next/image';
import LogoIcon from './logo.svg?url';

type Props = {
    isDesktop?: boolean;
};

export const Logo = (props: Props) => {
    return (
        <Image
            alt="tridva logo"
            height={props.isDesktop ? '32' : '16'}
            width={props.isDesktop ? '124' : '62'}
            src={LogoIcon}
        />
    );
};

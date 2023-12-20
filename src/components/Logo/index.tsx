import Image from 'next/image';
import LogoIcon from './logo.svg';

export const Logo = () => {
    return <Image alt="tridva logo" height="12" width="62" src={LogoIcon} />;
};

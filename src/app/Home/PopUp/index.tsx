import {Column} from '@/components/layout/Column';
import css from './PopUp.module.scss';
import {Text} from '@/components/Text';
import {ReactNode} from 'react';
import Image, {StaticImageData} from 'next/image';

type PopUpProps = {
    image?: StaticImageData;
    title?: ReactNode;
    description?: string;
    bottomRow?: ReactNode;
};

export default function PopUp(props: PopUpProps) {
    return (
        <Column gap={4}>
            {props.image && <Image className={css.image} src={props.image} width={48} height={48} alt="tridva store" />}

            <Column gap={3}>
                <Text align="center" size={16} height={18} weight={600}>
                    {props.title}
                </Text>
                <Text size={12} height={16} weight={400}>
                    {props.description}
                </Text>
            </Column>
            {props.bottomRow}
        </Column>
    );
}

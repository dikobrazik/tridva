import {loadCategory, loadOffer} from '@/api';
import {Column} from '@/components/layout/Column';
import Image from 'next/image';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';

type Props = {
    params: {id: string};
    searchParams: {};
};

export default async function Offer(props: Props) {
    const offer = await loadOffer({id: Number(props.params.id)});
    const category = await loadCategory({categoryId: Number(offer.categoryId)});

    const {title, photos, price} = offer;

    const imageSrc = photos?.length ? `${photos[0]}/700.jpg` : undefined;

    return (
        <Column>
            {imageSrc && <Image className={css.image} src={imageSrc} width={700} height={700} alt="offer image" />}
            <Column gap={3} paddingX="4" paddingY="2">
                <Row>
                    <Box className={css.category}>{category.name}</Box>
                </Row>
                <Text weight="600" size="24px">
                    {price} ₽
                </Text>
                <Text weight="600" size="16px">
                    {title}
                </Text>
            </Column>
        </Column>
    );
}

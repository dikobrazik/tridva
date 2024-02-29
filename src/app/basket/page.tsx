import {getBasketItems} from '@/api';
import {Checkbox} from '@/components/Checkbox';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {getOfferPhoto} from '@/shared/photos';
import Image from 'next/image';

export default async function Basket() {
    const basketItems = await getBasketItems();

    console.log(basketItems[0].offer);

    return (
        <Column flex="1">
            {basketItems.map(({id, offer}) => (
                <Block key={id}>
                    <Column>
                        <Row gap="3">
                            <Image src={getOfferPhoto(offer.photos, 140)} width="56" height="56" alt="offer image" />
                            <Column gap="2">
                                <Text size={12} weight={400}>
                                    {offer.title}
                                </Text>
                                <Text size={14} weight={600}>
                                    {offer.price}
                                </Text>
                                <Text size={10} weight={400} color="#303234A3">
                                    Оплатите товар, чтобы подтвердить участие.
                                </Text>
                            </Column>
                            <Checkbox name="select" />
                        </Row>
                    </Column>
                </Block>
            ))}
        </Column>
    );
}

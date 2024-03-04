import {getBasketItems} from '@/api';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {BasketItem} from './item';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {sum} from '@/shared/utils/sum';
import {Separator} from '@/components/Separator';
import {Checkbox} from '@/components/Checkbox';

export default async function Basket() {
    const basketItems = await getBasketItems();

    const itemsCount = basketItems.length;

    const offersCost = sum(basketItems.map(({offer}) => Number(offer.price))).toFixed(2);

    return (
        <Column gap="2" flex="1">
            <Row background="#fff" padding="16px" justifyContent="space-between">
                <span />
                <Text size={16} weight={600}>
                    Корзина{' '}
                    <Text size={16} weight={600} color="#3032347A">
                        {itemsCount}
                    </Text>
                </Text>
                <Checkbox />
            </Row>
            {basketItems.map(({id, offer}) => (
                <Block key={id}>
                    <BasketItem id={id} count={1} offer={offer} />
                </Block>
            ))}
            {Boolean(itemsCount) && (
                <Block gap="4">
                    <Text size={12} weight={600}>
                        Ваш заказ
                    </Text>
                    <Column gap="2">
                        <Row justifyContent="space-between">
                            <Text size={10} weight={400} color="#303234A3">
                                Товары ({basketItems.length})
                            </Text>
                            <Text size={10} weight={400}>
                                {offersCost} ₽
                            </Text>
                        </Row>
                        <Row justifyContent="space-between">
                            <Text size={10} weight={400} color="#303234A3">
                                Скидка
                            </Text>
                            <Text size={10} weight={600}>
                                {Number(offersCost) / 10} ₽
                            </Text>
                        </Row>
                        <Separator />
                        <Row justifyContent="space-between">
                            <Text size={12} weight={400} color="#303234A3">
                                Итого
                            </Text>
                            <Text size={10} weight={600}>
                                {offersCost} ₽
                            </Text>
                        </Row>
                    </Column>
                </Block>
            )}
        </Column>
    );
}

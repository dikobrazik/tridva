import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Separator} from '@/components/Separator';
import {Text} from '@/components/Text';
import {basketSelectors} from '@/lib/features/basket';
import {useAppSelector} from '@/lib/hooks';
import {formatPrice} from '@/shared/utils/formatPrice';

export const Summary = ({selectedItemsCount}: {selectedItemsCount: number}) => {
    const selectedItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const selectedBasketItemsCostBeforeDiscount = useAppSelector(
        basketSelectors.selectSelectedBasketItemsCostBeforeDiscount,
    );
    const formattedSelectedItemsCost = formatPrice(selectedItemsCost);

    return (
        <Block gap="4">
            <Text size={12} weight={600}>
                Ваш заказ
            </Text>
            <Column gap="2">
                <Row justifyContent="space-between">
                    <Text size={10} weight={400} color="#303234A3">
                        Товары ({selectedItemsCount})
                    </Text>
                    <Text size={10} weight={400}>
                        {selectedBasketItemsCostBeforeDiscount} ₽
                    </Text>
                </Row>
                <Row justifyContent="space-between">
                    <Text size={10} weight={400} color="#303234A3">
                        Скидка
                    </Text>
                    <Text size={10} weight={600}>
                        -{selectedBasketItemsCostBeforeDiscount - selectedItemsCost} ₽
                    </Text>
                </Row>
                <Separator />
                <Row justifyContent="space-between">
                    <Text size={12} weight={400} color="#303234A3">
                        Итого
                    </Text>
                    <Text color="#F40C43" size={10} weight={600}>
                        {formattedSelectedItemsCost} ₽
                    </Text>
                </Row>
            </Column>
        </Block>
    );
};

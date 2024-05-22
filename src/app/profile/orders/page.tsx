import {Header} from '@/components/Header';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';

export default function OrdersPage() {
    return (
        <Column gap={2}>
            <Header withBackArrow>Доставки 2</Header>
            <Block>
                <Column gap="1">
                    <Text size={12} weight={500}>
                        Заказ от 5 января
                    </Text>
                    <Text size={10} weight={400} color="#303234A3">
                        Пункт выдачи: Екатеринбург, Чемпионов 15. Ежедневно 10:00 - 21:00
                    </Text>
                </Column>
            </Block>
        </Column>
    );
}

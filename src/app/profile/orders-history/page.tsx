import {NoItems} from '@/components/Empty/NoItems';
import {Header} from '@/components/Header';
import {Column} from '@/components/layout/Column';

export default function OrdersHistoryPage() {
    const orders = [];
    return (
        <Column height="100%" backgroundColor="#fff" gap="2">
            <Header withBackArrow>Купленные товары</Header>

            {orders.length === 0 ? (
                <NoItems
                    title="Купленных товаров пока нет"
                    description="Загляните на главную, чтобы выбрать товар или найдите нужное в поиске"
                />
            ) : undefined}
        </Column>
    );
}

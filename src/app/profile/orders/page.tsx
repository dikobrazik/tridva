import {loadOrders} from '@/api';
import {NoItems} from '@/components/Empty/NoItems';
import {Header} from '@/components/Header';
import {Column} from '@/components/layout/Column';
import {OrderItem} from './components/OrderItem';
import {Text} from '@/components/Text';

export default async function OrdersPage() {
    const orders = await loadOrders();

    return (
        <Column gap={2} height="100%">
            <Header withBackArrow>
                Доставки <Text color="#303234A3">{orders.length}</Text>
            </Header>

            {orders.length === 0 ? (
                <NoItems
                    title="Доставок пока нет"
                    description="Загляните на главную, чтобы выбрать товар или найдите нужное в поиске"
                />
            ) : undefined}

            {orders.map(order => (
                <OrderItem key={order.id} {...order} />
            ))}
        </Column>
    );
}

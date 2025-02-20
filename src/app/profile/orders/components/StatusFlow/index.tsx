import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import css from './StatusFlow.module.scss';
import {ORDER_STATUS_MAP} from '@/shared/constants/order-status';
import cn from 'classnames';
import {useMemo} from 'react';
import {OrderItem} from '@/types/orders';
import {PickupPoint} from '@/types/geo';
import {Button} from '@/components/Button';

type Props = {
    address: PickupPoint['address'];
    status: OrderItem['status'];

    onClose: () => void;
};

export const StatusFlow = ({onClose, address, status: itemStatus}: Props) => {
    const STATUSES = useMemo(
        () =>
            [
                {name: 'В сборке', description: 'Собираем у упаковываем заказ', status: ORDER_STATUS_MAP.PAID},
                {
                    name: 'Передается в доставку',
                    description: 'Товары собраны и передаются в доставку',
                    status: ORDER_STATUS_MAP.TO_DELIVERY,
                },
                {
                    name: 'В пути',
                    description: 'Транспортировка товара до пункта выдачи',
                    status: ORDER_STATUS_MAP.IN_DELIVERY,
                },
                {
                    name: 'Ожидает в пункте выдачи',
                    description: `Адрес ПВЗ: ${address}.\nЕжедневно 10:00 - 21:00\nСрок хранения 5 дней`,
                    status: ORDER_STATUS_MAP.DELIVERED,
                },
                {name: 'Получен', description: undefined, status: ORDER_STATUS_MAP.RECEIVED},
            ] as const,
        [address],
    );

    return (
        <Column gap={8}>
            <Text size={16} weight={600}>
                Статус доставки
            </Text>

            <Column className={css.statusFlowContainer} gap={5}>
                {STATUSES.map(({name, description, status}, index) => (
                    <Column key={index} className={cn(css.status, {[css.active]: itemStatus === status})} gap={1}>
                        <Text size={10} weight={500}>
                            {name}
                        </Text>
                        {description && (
                            <Text whiteSpace="pre" size={10} weight={400} color="#303234A3">
                                {description}
                            </Text>
                        )}
                    </Column>
                ))}
            </Column>

            <Button onClick={onClose} size="m">
                Понятно, спасибо
            </Button>
        </Column>
    );
};

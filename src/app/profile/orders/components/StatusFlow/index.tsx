import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import css from './StatusFlow.module.scss';
import {STATUS_MAP} from '@/shared/constants/status';
import cn from 'classnames';
import {useMemo} from 'react';

type Props = {
    address: string;
    statusText: string;

    onClose: () => void;
};

export const StatusFlow = ({address, statusText}: Props) => {
    const STATUSES = useMemo(
        () =>
            [
                // {name: 'В сборке', description: 'Собираем у упаковываем заказ', status: STATUS_MAP.PAID},
                {
                    name: 'Передается в доставку',
                    description: 'Товары собраны и передаются в доставку',
                    status: STATUS_MAP.PAID,
                },
                {
                    name: 'В пути',
                    description: 'Транспортировка товара до пункта выдачи',
                    status: STATUS_MAP.IN_DELIVERY,
                },
                {
                    name: 'Ожидает в пункте выдачи',
                    description: `Адрес ПВЗ: ${address}.\nЕжедневно 10:00 - 21:00\nСрок хранения 5 дней`,
                    status: STATUS_MAP.DELIVERED,
                },
                {name: 'Получен', description: undefined, status: STATUS_MAP.RECEIVED},
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
                    <Column key={index} className={cn(css.status, {[css.active]: statusText === status})} gap={1}>
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
        </Column>
    );
};

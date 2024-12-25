'use client';

import css from './Status.module.scss';
import {Icon} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';
import {StatusFlow} from '../StatusFlow';
import {ORDER_STATUS_MAP} from '@/shared/constants/order-status';
import {Drawer} from '@/components/Drawer';
import {OrderItem} from '@/types/orders';

type Props = {
    address: string;
    status: OrderItem['status'];
};

const ORDER_STATUS_DESCRIPTION = {
    [ORDER_STATUS_MAP.CREATED]: 'Заказ ожидает оплаты',
    [ORDER_STATUS_MAP.PAYMENT_ERROR]: 'Заказ ожидает оплаты',
    [ORDER_STATUS_MAP.PAID]: 'В сборке',
    [ORDER_STATUS_MAP.TO_DELIVERY]: 'Передается в доставку',
    [ORDER_STATUS_MAP.IN_DELIVERY]: 'В пути',
    [ORDER_STATUS_MAP.DELIVERED]: 'Ожидает в пункте выдачи',
    [ORDER_STATUS_MAP.RECEIVED]: 'Получен',
    [ORDER_STATUS_MAP.CANCELED]: 'Отменен',
} as const;

const ORDER_STATUS_COLOR = {
    [ORDER_STATUS_MAP.CREATED]: '#F4420C',
    [ORDER_STATUS_MAP.PAYMENT_ERROR]: '#F4420C',
    [ORDER_STATUS_MAP.PAID]: '#4FDE38',
    [ORDER_STATUS_MAP.TO_DELIVERY]: '#4FDE38',
    [ORDER_STATUS_MAP.IN_DELIVERY]: '#4FDE38',
    [ORDER_STATUS_MAP.DELIVERED]: '#4FDE38',
    [ORDER_STATUS_MAP.RECEIVED]: '#4FDE38',
    [ORDER_STATUS_MAP.CANCELED]: '#4FDE38',
} as const;

export const Status = (props: Props) => {
    const {isActive, toggle, toggleOff} = useToggler();

    return (
        <>
            <Row className={css.status} backgroundColor={ORDER_STATUS_COLOR[props.status]} gap={1} onClick={toggle}>
                <Text size={14} weight={500} color="#FFFFFF">
                    {ORDER_STATUS_DESCRIPTION[props.status]}
                </Text>

                <Icon name="informationCircleWhite" />
            </Row>

            <Drawer isOpen={isActive} onClose={toggle}>
                <StatusFlow status={props.status} address={props.address} onClose={toggleOff} />
            </Drawer>
        </>
    );
};

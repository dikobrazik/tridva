'use client';

import css from './Status.module.scss';
import {Icon} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';
import {StatusFlow} from '../StatusFlow';
import {STATUS_MAP} from '@/shared/constants/status';
import {Drawer} from '@/components/Drawer';
import {OrderOffer} from '@/types/orders';

type Props = {
    address: string;
    statusText: OrderOffer['statusText'];
};

const ORDER_STATUS_DESCRIPTION = {
    [STATUS_MAP.CREATED]: 'Заказ ожидает оплаты',
    [STATUS_MAP.PAYMENT_ERROR]: 'Заказ ожидает оплаты',
    [STATUS_MAP.PAID]: 'Передается в доставку',
    [STATUS_MAP.IN_DELIVERY]: 'В пути',
    [STATUS_MAP.DELIVERED]: 'Ожидает в пункте выдачи',
    [STATUS_MAP.RECEIVED]: 'Получен',
};

const ORDER_STATUS_COLOR = {
    [STATUS_MAP.CREATED]: '#F4420C',
    [STATUS_MAP.PAYMENT_ERROR]: '#F4420C',
    [STATUS_MAP.PAID]: '#4FDE38',
    [STATUS_MAP.IN_DELIVERY]: '#4FDE38',
    [STATUS_MAP.DELIVERED]: '#4FDE38',
    [STATUS_MAP.RECEIVED]: '#4FDE38',
};

export const Status = (props: Props) => {
    const {isActive, toggle, toggleOff} = useToggler();

    return (
        <>
            <Row className={css.status} backgroundColor={ORDER_STATUS_COLOR[props.statusText]} gap={1} onClick={toggle}>
                <Text size={14} weight={500} color="#FFFFFF">
                    {ORDER_STATUS_DESCRIPTION[props.statusText]}
                </Text>

                <Icon name="informationCircleWhite" />
            </Row>

            <Drawer isOpen={isActive} onClose={toggle}>
                <StatusFlow statusText={props.statusText} address={props.address} onClose={toggleOff} />
            </Drawer>
        </>
    );
};

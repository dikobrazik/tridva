'use client';

import {cancelOrder} from '@/api';
import {Confirm} from '@/components/Confirm';
import {Box} from '@/components/layout/Box';
import {Text} from '@/components/Text';
import {Order} from '@/types/orders';
import {useRouter} from 'next/navigation';

type Props = {
    orderId: Order['id'];
};

export const CancelOrderButton = (props: Props) => {
    const router = useRouter();

    const onCancel = async () => {
        await cancelOrder(props);
        router.refresh();
    };

    return (
        <Confirm
            title="Отменить заказ"
            description="Вы точно хотите отменить заказ?"
            acceptButtonText="Отменить заказ"
            cancelButtonText="Я передумал"
            onAcceptClick={onCancel}
            renderButton={({onClick}) => (
                <Box onClick={onClick}>
                    <Text size={10} weight={500} color="#F40C43">
                        Оформить возврат
                    </Text>
                </Box>
            )}
        />
    );
};

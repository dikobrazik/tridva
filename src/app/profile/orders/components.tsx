'use client';

import {cancelOrder} from '@/api';
import {Box} from '@/components/layout/Box';
import {Text} from '@/components/Text';
import {Offer} from '@/types/offers';
import {Order} from '@/types/orders';

type Props = {
    orderId: Order['id'];
    offerId: Offer['id'];
};

export const CancelOrderButton = (props: Props) => {
    return (
        <Box
            onClick={async () => {
                await cancelOrder(props);
                window.location.reload();
            }}
        >
            <Text size={10} weight={500} color="#F40C43">
                Оформить возврат
            </Text>
        </Box>
    );
};

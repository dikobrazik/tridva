'use client';

import {Button} from '@/components/Button';
import {OfferBlock} from '@/components/OfferCard/OfferBlock';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useOffer} from '../../../../context';

export const GroupJoinedContent = () => {
    const router = useRouter();
    const offer = useOffer();

    return (
        <Column gap="10">
            <Column gap="2" alignItems="center">
                <Text align="center" size={24} weight={500}>
                    🥳
                </Text>
                <Text align="center" size={16} weight={600} color="#4FDE38">
                    Группа собрана!
                </Text>
            </Column>
            <Column gap="2" alignItems="center">
                <Text size={14} weight={500}>
                    Товар добавлен в корзину
                </Text>
                <Text align="center" size={10} weight={400} color="#303234A3">
                    Оплатите товар, чтобы подтвердить участие
                </Text>
                <OfferBlock offer={offer} />
            </Column>

            <Button width="full" onClick={router.refresh}>
                <Link href="/basket">Перейти в корзину и оплатить</Link>
            </Button>
        </Column>
    );
};

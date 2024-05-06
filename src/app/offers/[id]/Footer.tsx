'use client';

import {putOfferToBasket} from '@/api';
import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {CreateGroupDrawer} from './CreateGroupDrawer';
import {Offer} from '@/types/offers';

export default function Footer({offer}: {offer: Offer}) {
    const onCreateSingleGroupClick = () => {
        putOfferToBasket({offerId: offer.id});
    };

    return (
        <Column background="#fff" padding="8px 16px" gap="2">
            <Row>
                <Button flex="1" variant="outline" size="m">
                    <Row flex="1" justifyContent="space-between">
                        <Column>
                            <Text align="start" size={10} weight={600} height={10}>
                                Присоединиться к группе с Владимиром М.
                            </Text>
                            <Text align="start" size={8} weight={400} height={12}>
                                Нужен еще 1 человек для покупки, до конца сбора:{' '}
                                <Text size={8} weight={600} height={12}>
                                    23:20:59
                                </Text>
                            </Text>
                        </Column>
                    </Row>
                </Button>
            </Row>
            <Row gap="2" justifyContent="center">
                <Button variant="normal" size="m" flex="1" onClick={onCreateSingleGroupClick}>
                    <Column>
                        <Text size={12} weight={600} height={14}>
                            Купить в розницу
                        </Text>
                        <Text size={12} weight={600} height={14}>
                            {offer.price} ₽
                        </Text>
                    </Column>
                </Button>
                <CreateGroupDrawer offer={offer} />
            </Row>
        </Column>
    );
}

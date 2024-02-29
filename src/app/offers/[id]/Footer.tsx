'use client';

import {createSingleGroup} from '@/api';
import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';

export default function Footer({offerId}: {offerId: number}) {
    const onCreateSingleGroupClick = () => {
        createSingleGroup({offerId});
    };
    const onCreateGroupClick = () => {};

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

                        {/* <Button size="m" icon="chevronRight" iconSize="xs" padding="6px" /> */}
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
                            2499 ₽
                        </Text>
                    </Column>
                </Button>
                <Button size="m" flex="1" onClick={onCreateGroupClick}>
                    <Column>
                        <Text size={12} weight={600} height={14}>
                            Создать группу
                        </Text>
                        <Text size={12} weight={600} height={14}>
                            1499 ₽
                        </Text>
                    </Column>
                </Button>
            </Row>
        </Column>
    );
}

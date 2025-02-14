'use client';

import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';

type ValueRowProps = {
    name: string;
    value?: string;
    onClick: () => void;
};

export const ValueRow = (props: ValueRowProps) => {
    return (
        <Row
            onClick={props.onClick}
            paddingX="4"
            paddingY="3"
            backgroundColor="#F5F5F5"
            borderRadius={3}
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Column gap="2">
                <Text size="12" weight={500}>
                    {props.name}
                </Text>
                {props.value ? (
                    <Text size={10} weight={400} color="#303234A3">
                        {props.value}
                    </Text>
                ) : (
                    <Row gap="1" color="#F40C43" alignItems="center">
                        <Icon name="plusCircle" />{' '}
                        <Text size={10} weight={500} color="#F40C43">
                            Добавить
                        </Text>
                    </Row>
                )}
            </Column>

            {props.value ? (
                <Row gap="1" color="#303234A3" alignItems="center">
                    <Icon name="pen" size="xs" />
                    <Text size={10} weight={500}>
                        Изменить
                    </Text>
                </Row>
            ) : null}
        </Row>
    );
};

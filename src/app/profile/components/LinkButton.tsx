'use server';

import {Icon, IconName} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import Link from 'next/link';

type LinkCardProps = {
    href: string;
    backgroundColor?: string;
    icon: IconName;
    title: string;
    description?: string;
};

export const LinkButton = (props: LinkCardProps) => (
    <Link href={props.href}>
        <Row
            borderRadius="3"
            backgroundColor="#F5F5F5"
            paddingX="4"
            paddingY="3"
            justifyContent="space-between"
            alignItems="center"
        >
            <Row gap="2">
                <Icon name={props.icon} />
                <Text size={12} weight={500}>
                    {props.title}
                </Text>
                {props.description ? (
                    <Text size={10} weight={400} color="#303234A3" lineHeight={16}>
                        {props.description}
                    </Text>
                ) : null}
            </Row>

            <Icon name="chevronRight" />
        </Row>
    </Link>
);

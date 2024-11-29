'use server';

import {Icon, IconName} from '@/components/Icon';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import Link from 'next/link';
import css from './LinkCard.module.scss';

type LinkCardProps = {
    href: string;
    background?: string;
    icon: IconName;
    title: string;
    description?: string;
};

export const LinkCard = (props: LinkCardProps) => (
    <Link href={props.href} className={css.linkCard}>
        <Column
            flex="1 0 0"
            borderRadius="3"
            gap="1"
            background={props.background ?? '#F5F5F5'}
            paddingX="4"
            paddingY="3"
        >
            <Row gap="2">
                <Icon name={props.icon} />
                <Text size={12} weight={500}>
                    {props.title}
                </Text>
            </Row>
            {props.description ? (
                <Text size={10} weight={400} color="#303234A3">
                    {props.description}
                </Text>
            ) : null}
        </Column>
    </Link>
);

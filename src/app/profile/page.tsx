'use client';

import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import Image from 'next/image';
import {Text} from '@/components/Text';
import {Icon, IconName} from '@/components/Icon';
import telegramIcon from './telegram.svg';
import whatsappIcon from './whatsapp.svg';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {userSelectors} from '@/lib/features/user';
import {Avatar} from '@/components/Avatar';
import {Box} from '@/components/layout/Box';
import css from './Page.module.scss';

type LinkCardProps = {
    href: string;
    backgroundColor?: string;
    icon: IconName;
    title: string;
    description?: string;
};

const LinkCard = (props: LinkCardProps) => (
    <Link href={props.href} className={css.linkCard}>
        <Column
            flex="1 0 0"
            borderRadius="3"
            gap="1"
            backgroundColor={props.backgroundColor ?? '#F5F5F5'}
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

const LinkButton = (props: LinkCardProps) => (
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
                    <Text size={10} weight={400} color="#303234A3" height={16}>
                        {props.description}
                    </Text>
                ) : null}
            </Row>

            <Icon name="chevronRight" />
        </Row>
    </Link>
);

export default function ProfilePage() {
    const profile = useSelector(userSelectors.selectProfile);
    const phone = useSelector(userSelectors.selectPhone);

    return (
        <Column gap="2">
            <div />
            <Block gap="4">
                {profile && (
                    <Link href="/profile/edit">
                        <Row gap="4" justifyContent="space-between" alignItems="center">
                            <Row gap="4" alignItems="center">
                                <Avatar id={profile.id} />
                                <Column gap="1">
                                    <Text size={16} weight={600}>
                                        {profile?.name}
                                    </Text>
                                    <Text size={10} weight={400} color="#303234A3">
                                        {phone}
                                    </Text>
                                </Column>
                            </Row>
                            <Icon name="chevronRight" />
                        </Row>
                    </Link>
                )}

                <Column gap="2">
                    <LinkCard
                        href="/profile/orders"
                        backgroundColor="#FF1D521F"
                        icon="delivery"
                        title="Доставки"
                        description="3 доставки. Ближайшая: 12 марта"
                    />

                    <Row gap="2">
                        <Box flex="1 0 0">
                            <LinkCard
                                href="/profile/groups"
                                icon="usersProfiles"
                                title="Группы"
                                description="3 группы. Отслеживайте статус сбора группы"
                            />
                        </Box>
                        <Box flex="1 0 0">
                            <LinkCard
                                href="/profile/favorites"
                                icon="heart"
                                title="Избранное"
                                description="0 товаров"
                            />
                        </Box>
                    </Row>
                    <LinkCard href="/profile/orders-history" icon="bag" title="Купленные товары" />
                </Column>
            </Block>

            {/* <Block gap="2">
                <LinkButton href="#" icon="marker" title="Город" description="Екатеринбург" />
                <LinkButton href="#" icon="map" title="Пункты выдачи на карте" />
            </Block> */}

            <Block gap="2">
                <LinkButton href="#" icon="help" title="Справка" />
                <LinkButton href="#" icon="messageChat" title="Связаться с нами" />
            </Block>

            <Column paddingX="4" gap="3">
                <Text>Мы в соцсетях:</Text>
                <Row gap="3">
                    <Image width={40} height={40} alt="telegram" src={telegramIcon} />
                    <Image width={40} height={40} alt="whatsapp" src={whatsappIcon} />
                </Row>
                <Link href="#">
                    <Text decoration="underline">Политика Конфиденциальности</Text>
                </Link>
                <Link href="#">
                    <Text decoration="underline">Пользовательские соглашения</Text>
                </Link>
                <Link href="#">
                    <Text decoration="underline">
                        На информационном ресурсе применяются рекомендательные технологии
                    </Text>
                </Link>
                <Text>2023-2024 © Tridva</Text>
            </Column>
        </Column>
    );
}

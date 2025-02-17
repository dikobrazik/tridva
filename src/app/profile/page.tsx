import {Block} from '@/components/layout/Block';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {pluralize} from '@/shared/utils/pluralize';
import Image from 'next/image';
import Link from 'next/link';
import telegramIcon from './telegram.svg?url';
import whatsappIcon from './whatsapp.svg?url';
import {LinkCard} from './components/LinkCard';
import {ProfileButton, ProfileLinkButton} from './components/ProfileButton';
import {ProfileBlock} from './components/ProfileBlock';
import {loadFavoriteOffersCount, loadOrdersCount, loadUser, loadUserGroupsCount} from '@/api';

export default async function ProfilePage() {
    const [user, groupsCount, favoriteOffersCount, ordersCount] = await Promise.all([
        loadUser(),
        loadUserGroupsCount(),
        loadFavoriteOffersCount(),
        loadOrdersCount(),
    ]);

    const ordersDescription =
        ordersCount > 0
            ? `${ordersCount} ${pluralize(ordersCount, ['доставка', 'доставки', 'доставок'])}. Ближайшая: 12 марта`
            : 'Не ожидается';

    const groupsDescription =
        groupsCount > 0
            ? `${groupsCount} ${pluralize(groupsCount, [
                  'группа',
                  'группы',
                  'групп',
              ])}. Отслеживайте статус сбора группы`
            : 'У вас пока нет ни одной группы';

    const favoriteOffersDescription =
        favoriteOffersCount > 0
            ? `${favoriteOffersCount} ${pluralize(favoriteOffersCount, ['товар', 'товара', 'товаров'])}`
            : 'У вас пока нет ни одного товара в избранных';

    return (
        <Column gap="2">
            <div />
            <Block gap="4">
                <ProfileBlock />

                {user.isAnonymous && (
                    <LinkCard
                        href="/profile/favorites"
                        icon="heart"
                        title="Избранное"
                        description={favoriteOffersDescription}
                    />
                )}

                {!user.isAnonymous && (
                    <Column gap="2">
                        <LinkCard
                            href="/profile/orders"
                            background="linear-gradient(112.76deg, rgba(255, 29, 82, 0.12) 9.48%, rgba(255, 214, 0, 0.12) 110.09%)"
                            icon="delivery"
                            title="Доставки"
                            description={ordersDescription}
                        />

                        <Row gap="2">
                            <Box flex="1 0 0">
                                <LinkCard
                                    href="/profile/groups"
                                    icon="usersProfiles"
                                    title="Группы"
                                    description={groupsDescription}
                                />
                            </Box>
                            <Box flex="1 0 0">
                                <LinkCard
                                    href="/profile/favorites"
                                    icon="heart"
                                    title="Избранное"
                                    description={favoriteOffersDescription}
                                />
                            </Box>
                        </Row>
                        <LinkCard href="/profile/orders-history" icon="bag" title="Купленные товары" />
                    </Column>
                )}
            </Block>

            {/* <Block gap="2">
                <ProfileButton href="#" icon="marker" title="Город" description="Екатеринбург" />
                <ProfileButton href="#" icon="map" title="Пункты выдачи на карте" />
            </Block> */}

            <Block gap="2">
                <ProfileLinkButton href="/profile/support" icon="help" title="Справка" />
                <ProfileButton icon="messageChat" title="Связаться с нами" />
            </Block>

            <Column paddingX="4" gap="3">
                <Text>Мы в соцсетях:</Text>
                <Row gap="3">
                    <Image width={40} height={40} alt="telegram" src={telegramIcon} />
                    <Image width={40} height={40} alt="whatsapp" src={whatsappIcon} />
                </Row>
                <Link href="/privacy">
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

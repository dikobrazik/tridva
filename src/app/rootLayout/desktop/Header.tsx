import {Column} from '@/components/layout/Column';
import css from './Header.module.scss';
import {Row} from '@/components/layout/Row';
import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import Link from 'next/link';
import {Logo} from '@/components/Logo';
import {Button, LinkButton} from '@/components/Button';
import cn from 'classnames';
import {PopularCategories} from '@/app/Home/PopularCategories';
import {Search} from './Search';
import {Suspense} from 'react';

export const Header = () => {
    return (
        <Row className={css.container}>
            <Column className={css.content} paddingTop="24px" gap="4">
                <Row justifyContent="space-between">
                    <Box gap="1">
                        <Icon name="marker" />
                        <Text size={14} weight={400} color="#2F3337A3">
                            Город:
                        </Text>
                        <Text size={14} weight={500} color="#303234">
                            Екатеринбург
                        </Text>
                    </Box>
                    <Row gap="6">
                        <Link href="#">
                            <Text size={14} weight={500} color="#2F3337A3">
                                Помощь
                            </Text>
                        </Link>
                        <Link href="#">
                            <Text size={14} weight={500} color="#2F3337A3">
                                Пункты выдачи
                            </Text>
                        </Link>
                    </Row>
                </Row>

                <Row gap="8" alignItems="flex-start">
                    <Link href="/">
                        <Logo isDesktop />
                    </Link>

                    <Button
                        className={cn(css.categoriesButton, css.customSize)}
                        icon="menuWhite"
                        iconSize="m"
                        iconLeft
                        variant="custom"
                        size="s"
                        padding="8px 16px"
                    >
                        <Text size={14}>Категории</Text>
                    </Button>

                    <Search />

                    <Row gap={3}>
                        <LinkButton href="/profile/favorites" variant="pseudo">
                            <Column gap="2" alignItems="center">
                                <Icon size="m" name="heart" />
                                <Text size={14} weight={400}>
                                    Избранное
                                </Text>
                            </Column>
                        </LinkButton>
                        <LinkButton href="/profile" variant="pseudo">
                            <Column gap="2" alignItems="center">
                                <Icon size="m" name="user" />
                                <Text size={14} weight={400}>
                                    Профиль
                                </Text>
                            </Column>
                        </LinkButton>
                        <LinkButton href="/basket" variant="pseudo">
                            <Column gap="2" alignItems="center">
                                <Icon size="m" name="cart" />
                                <Text size={14} weight={400}>
                                    Корзина
                                </Text>
                            </Column>
                        </LinkButton>
                    </Row>
                </Row>

                <Suspense>
                    <PopularCategories />
                </Suspense>
            </Column>
        </Row>
    );
};

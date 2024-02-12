import type {Metadata} from 'next';
import './globals.scss';
import {Logo} from '@/components/Logo';
import {Row} from '@/components/layout/Row';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import {Box} from '@/components/layout/Box';
import React from 'react';
import Link from 'next/link';
import StoreProvider from './StoreProvider';
import {Search} from './Search';
import {OffersListContextProvider} from './OffersList/context';
import {FooterButton} from './FooterButton';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Tridva - интернет-магазин. Дешевые групповые покупки товаров',
    description: 'Интернет-магазин с возможностью покупать товары группой по оптовым ценам',
    verification: {
        yandex: '08f5e449ef421774',
    },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>
                    <OffersListContextProvider>
                        <Column minWidth={360} height="100%">
                            <Row alignItems="center" gap="2" paddingX={4} paddingY={4}>
                                <Link href="/">
                                    <Logo />
                                </Link>
                                <Search />
                            </Row>
                            <Box overflowY="auto" height="100%">
                                {children}
                            </Box>
                            <Row padding="8px 16px" justifyContent="space-between">
                                <FooterButton icon="home" activeIcon="homeActive" title="Главная" href="/" />
                                <FooterButton
                                    icon="menu"
                                    activeIcon="menuActive"
                                    title="Категории"
                                    href="/categories"
                                />
                                <FooterButton icon="cart" activeIcon="cartActive" title="Корзина" href="/cart" />
                                <FooterButton icon="user" activeIcon="userActive" title="Профиль" href="/profile" />
                            </Row>
                        </Column>
                    </OffersListContextProvider>
                </StoreProvider>
            </body>
        </html>
    );
}

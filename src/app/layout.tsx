import type {Metadata} from 'next';
import './globals.scss';
import {Row} from '@/components/layout/Row';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import {Box} from '@/components/layout/Box';
import React from 'react';
import StoreProvider from './StoreProvider';
import {Header} from './Header';
import {OffersListContextProvider} from './OffersList/context';
import {FooterButton} from './FooterButton';
import css from './Layout.module.scss';
import {ru} from 'date-fns/locale';
import {setDefaultOptions} from 'date-fns';
import AuthorizationProvider from './AuthorizationProvider';
import {cookies} from 'next/headers';
import axios from 'axios';

setDefaultOptions({locale: ru});

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Tridva - интернет-магазин. Дешевые совместные покупки товаров',
    description: 'Интернет-магазин с возможностью покупать товары совместно по оптовым ценам',
    verification: {
        yandex: '08f5e449ef421774',
        google: 'kOMBcuVi1F7zH0Rj3nyl0v3HiIyN2OUJwcvY99xFYpY',
    },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>
                    <AuthorizationProvider>
                        <OffersListContextProvider>
                            <Column minWidth={360} height="100%">
                                <Header />
                                <Box className={css.container} overflowY="auto" height="100%">
                                    {children}
                                </Box>
                                <Row className={css.footer} padding="8px 16px" justifyContent="space-between">
                                    <FooterButton icon="home" activeIcon="homeActive" title="Главная" href="/" />
                                    <FooterButton
                                        icon="menu"
                                        activeIcon="menuActive"
                                        title="Категории"
                                        href="/categories"
                                    />
                                    <FooterButton icon="cart" activeIcon="cartActive" title="Корзина" href="/basket" />
                                    <FooterButton icon="user" activeIcon="userActive" title="Профиль" href="/profile" />
                                </Row>
                            </Column>
                        </OffersListContextProvider>
                    </AuthorizationProvider>
                </StoreProvider>
            </body>
        </html>
    );
}

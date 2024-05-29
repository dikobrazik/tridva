import type {Metadata} from 'next';
import './globals.scss';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import {Box} from '@/components/layout/Box';
import React from 'react';
import StoreProvider from './StoreProvider';
import {Header} from './Header';
import {OffersListContextProvider} from './OffersList/context';
import css from './Layout.module.scss';
import AuthTokenProvider from './AuthorizationProvider';
import classNames from 'classnames';
import {Footer} from './Footer';
import {ru} from 'date-fns/locale';
import {setDefaultOptions} from 'date-fns';

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
            <body className={classNames(inter.className, css.body)}>
                <StoreProvider>
                    <AuthTokenProvider>
                        <OffersListContextProvider>
                            <Column className={css.container} width={460} minWidth={360} height="100%">
                                <Header />
                                <Box className={css.content} overflowY="auto" height="100%">
                                    {children}
                                </Box>
                                <Footer />
                            </Column>
                        </OffersListContextProvider>
                    </AuthTokenProvider>
                </StoreProvider>
            </body>
        </html>
    );
}

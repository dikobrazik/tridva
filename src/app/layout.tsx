import type {Metadata} from 'next';
import './globals.scss';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import {Box} from '@/components/layout/Box';
import React from 'react';
import StoreProvider from '@/lib/StoreProvider';
import {Header} from './rootLayout/Header';
import css from './Layout.module.scss';
import AuthTokenProvider from './authorization/AuthorizationProvider';
import classNames from 'classnames';
import {Footer} from './rootLayout/Footer';
import {ru} from 'date-fns/locale';
import {setDefaultOptions} from 'date-fns';

setDefaultOptions({locale: ru});

const inter = Inter({weight: ['400', '500', '600'], subsets: ['latin', 'cyrillic']});

export const metadata: Metadata = {
    title: 'Tridva - интернет-магазин. Дешевые совместные покупки товаров',
    description: 'Интернет-магазин с возможностью покупать товары совместно по оптовым ценам',
    verification: {
        yandex: '08f5e449ef421774',
        google: 'kOMBcuVi1F7zH0Rj3nyl0v3HiIyN2OUJwcvY99xFYpY',
    },
    other: {
        'mobile-web-app-capable': 'true',
    },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
                <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <meta name="apple-mobile-web-app-title" content="Tridva" />
            </head>
            <body className={classNames(inter.className, css.body)}>
                <StoreProvider>
                    <AuthTokenProvider>
                        <Column className={css.container} width={460} minWidth={360} paddingBottom="59px">
                            <Header />
                            <Box id="content" className={css.content}>
                                {children}
                            </Box>
                            <Footer />
                        </Column>
                    </AuthTokenProvider>
                </StoreProvider>
            </body>
        </html>
    );
}

import {Box} from '@/components/layout/Box';
import StoreProvider from '@/lib/StoreProvider';
import {setDefaultOptions} from 'date-fns';
import {ru} from 'date-fns/locale/ru';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import React, {Suspense} from 'react';
import * as RootMobileLayout from './rootLayout/mobile';
import * as RootDesktopLayout from './rootLayout/desktop';
import {Metrika} from './Metrika';
import AuthTokenProvider from './authorization/AuthorizationProvider';
import './globals.scss';
import {NotificationsContainer} from './notifications';
import {Device} from '@/components/layout/Device';
import {Container} from './rootLayout/container';

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

export default async function RootLayout({children}: {children: React.ReactNode}) {
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
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </head>
            <body className={inter.className}>
                <StoreProvider>
                    <AuthTokenProvider>
                        <Container>
                            <Suspense>
                                <Device mobile={<RootMobileLayout.Header />} desktop={<RootDesktopLayout.Header />} />
                            </Suspense>
                            <NotificationsContainer />
                            <Box id="content">{children}</Box>
                            <Device mobile={<RootMobileLayout.Footer />} />
                        </Container>
                    </AuthTokenProvider>
                </StoreProvider>
                <Metrika />
            </body>
        </html>
    );
}

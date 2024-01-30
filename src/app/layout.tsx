import type {Metadata} from 'next';
import './globals.css';
import {Logo} from '@/components/Logo';
import {Row} from '@/components/layout/Row';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import {Icon, IconName} from '@/components/Icon';
import {Text} from '@/components/Text';
import React from 'react';
import Link from 'next/link';
import StoreProvider from './StoreProvider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Tridva',
    description: 'Grouped marketplace',
};

const FooterButton = ({icon, title, href}: {icon: IconName; title: string; href: string}) => {
    return (
        <Link href={href}>
            <Column gap={1} alignItems="center" paddingX={3}>
                <Icon name={icon} size="m" />
                <Text>{title}</Text>
            </Column>
        </Link>
    );
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Column minWidth={360} height="100vh">
                    <Row alignItems="center" gap="2" paddingX={4} paddingY={4}>
                        <Logo />
                        <TextField icon="search" />
                    </Row>
                    <StoreProvider>{children}</StoreProvider>
                    <Row padding="8px 16px" justifyContent="space-between">
                        <FooterButton icon="home" title="Главная" href="/" />
                        <FooterButton icon="menu" title="Категории" href="/menu" />
                        <FooterButton icon="cart" title="Корзина" href="/cart" />
                        <FooterButton icon="user" title="Профиль" href="" />
                    </Row>
                </Column>
            </body>
        </html>
    );
}

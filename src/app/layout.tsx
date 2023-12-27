import type {Metadata} from 'next';
import './globals.css';
import {Logo} from '@/components/Logo';
import {Row} from '@/components/layout/Row';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import {Icon, IconName} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import React from 'react';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Tridva',
    description: 'Grouped marketplace',
};

const FooterButton = ({icon, title, href}: {icon: IconName; title: string; href: string}) => {
    return (
        <Column as="a" gap={1} href={href} alignItems="center" paddingX={3}>
            <Icon name={icon} size="m" />
            <Text>{title}</Text>
        </Column>
    );
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Row justifyContent="center">
                    <Column gap={4} minWidth={360} height="100vh" padding="16px 16px 0 16px">
                        <Row alignItems="center" gap="2">
                            <Logo />
                            <TextField icon="search" />
                        </Row>
                        <Box overflowY="scroll">{children}</Box>
                        <Row padding="8px 16px" justifyContent="space-between">
                            <FooterButton icon="home" title="Главная" href="" />
                            <FooterButton icon="menu" title="Категории" href="" />
                            <FooterButton icon="cart" title="Корзина" href="/cart" />
                            <FooterButton icon="user" title="Профиль" href="" />
                        </Row>
                    </Column>
                </Row>
            </body>
        </html>
    );
}

import type {Metadata} from 'next';
import './globals.css';
import {Logo} from '@/components/Logo';
import {Row} from '@/components/layout/Row';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {Inter} from 'next/font/google';
import InformationRow from './page';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Tridva',
    description: 'Grouped marketplace',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Row justifyContent="center">
                    <Column gap={4} minWidth={360} padding="16px">
                        <Row alignItems="center" gap="2">
                            <Logo />
                            <TextField icon="search" />
                        </Row>
                        {children}
                    </Column>
                </Row>
            </body>
        </html>
    );
}

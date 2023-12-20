import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Logo} from '@/components/Logo';
import {Row} from '@/components/layout/Row';
import {TextField} from '@/components/TextField';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Tridva',
    description: 'Grouped marketplace',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Row>
                    <Logo />
                    <TextField />
                </Row>
                {children}
            </body>
        </html>
    );
}

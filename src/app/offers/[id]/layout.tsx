import {Column} from '@/components/layout/Column';
import {PropsWithChildren} from 'react';
import Footer from './Footer';

export default function Layout(props: PropsWithChildren<{params: {id: string}}>) {
    const offerId = Number(props.params.id);
    return (
        <Column height="100%">
            <Column height="100%" overflowY="auto">
                {props.children}
            </Column>
            <Footer offerId={offerId} />
        </Column>
    );
}

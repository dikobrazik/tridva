import {Column} from '@/components/layout/Column';
import {PropsWithChildren} from 'react';
import Footer from './Footer';
import {loadOffer} from '@/api';

export default async function Layout(props: PropsWithChildren<{params: {id: string}}>) {
    const offerId = Number(props.params.id);
    const offer = await loadOffer({id: offerId});

    return (
        <Column height="100%">
            <Column height="100%" overflowY="auto">
                {props.children}
            </Column>
            <Footer offer={offer} />
        </Column>
    );
}

import {Column} from '@/components/layout/Column';
import {PropsWithChildren} from 'react';
import Footer from './Footer';
import {loadOffer} from '@/api';
import {PageParams} from '@/shared/types/next';
import {Metadata} from 'next';

export async function generateMetadata({params}: PageParams<null, {id: string}>): Promise<Metadata> {
    const offerId = Number(params.id);
    const offer = await loadOffer({id: offerId});

    return {
        title: `${offer.title} купить по низкой цене`,
        description: `${offer.description}. совместная покупка, низкие цены, низкая цена, купить, дешево, недорого`,
    };
}

export default async function Layout(props: PropsWithChildren<{params: {id: string}}>) {
    const offerId = Number(props.params.id);
    const offer = await loadOffer({id: offerId});

    return (
        <Column height="100%">
            <Column height="100%" overflowY="auto" paddingBottom={112}>
                {props.children}
            </Column>
            <Footer offer={offer} />
        </Column>
    );
}

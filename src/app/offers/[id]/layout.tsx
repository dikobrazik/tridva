import {Column} from '@/components/layout/Column';
import {PropsWithChildren} from 'react';
import Footer from './components/Footer';
import {loadOffer} from '@/api';
import {PageParams} from '@/shared/types/next';
import {Metadata} from 'next';
import {getFirstOfferPhoto} from '@/shared/photos';

export async function generateMetadata({params}: PageParams<never, {id: string}>): Promise<Metadata> {
    const offerId = Number(params.id);
    const offer = await loadOffer({id: offerId});

    return {
        title: `${offer.title} купить дешево`,
        description: `${offer.description}. совместная покупка, низкие цены, низкая цена, купить, дешево, недорого`,
        openGraph: {
            title: offer.title,
            images: getFirstOfferPhoto(offer.photos, 700) as string,
        },
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

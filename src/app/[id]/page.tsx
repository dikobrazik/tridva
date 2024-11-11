import {PageParams} from '@/shared/types/next';
import {redirect} from 'next/navigation';

export default async function OfferPage({params}: PageParams<unknown, {id: string}>) {
    redirect(`/offers/${params.id}`);
}

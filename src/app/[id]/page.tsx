import {PageParams} from '@/shared/types/next';
import {isNumber} from '@/shared/utils/isNumber';
import {notFound, redirect} from 'next/navigation';

export default async function OfferPage({params}: PageParams<unknown, {id: string}>) {
    if (isNumber(params.id)) {
        redirect(`/offers/${params.id}`);
    }
    notFound();
}

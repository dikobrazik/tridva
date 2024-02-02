import {loadCategory, loadOffer} from '@/api';
import {Column} from '@/components/layout/Column';
import Image from 'next/image';

type Props = {
    params: {id: string};
    searchParams: {};
};

export default async function Offer(props: Props) {
    const offer = await loadOffer({id: Number(props.params.id)});
    const category = await loadCategory({categoryId: Number(offer.categoryId)});

    const {title, photos, price} = offer;

    const imageSrc = photos?.length ? `${photos[0]}/700.jpg` : undefined;

    return (
        <Column>
            {imageSrc && <Image src={imageSrc} width={700} height={700} alt="offer image" />}
            {category.name}
            {price} ₽{title}
        </Column>
    );
}

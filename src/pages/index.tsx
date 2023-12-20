import {loadOffers} from '@/api';
import {InferGetStaticPropsType} from 'next';

export const getStaticProps = async () => {
    const offers = await loadOffers();

    return {props: {offers}};
};

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            {props.offers.map(offer => (
                <li key={offer.id}>{offer.title}</li>
            ))}
        </div>
    );
}

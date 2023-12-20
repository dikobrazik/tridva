import {loadOffers} from '@/api/offers';
import {InferGetStaticPropsType} from 'next';

export const getStaticProps = async () => {
    const offers = await loadOffers();

    return {props: {offers}};
};

export default function About(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return <div>lol</div>;
}

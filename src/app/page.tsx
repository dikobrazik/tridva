import {loadOffers} from '@/api';

export default async function Home() {
    const offers = await loadOffers();

    return (
        <div>
            {offers.map(offer => (
                <li key={offer.id}>{offer.title}</li>
            ))}
        </div>
    );
}

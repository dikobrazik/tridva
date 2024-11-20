import {loadUserGroups} from '@/api';
import {OffersListContainer} from '@/app/OffersList';
import {Header} from '@/components/Header';
import {OfferCard} from '@/components/OfferCard';
import {Column} from '@/components/layout/Column';

export default async function GroupsPage() {
    const groups = await loadUserGroups();

    return (
        <Column height="100%" backgroundColor="#fff" gap="2">
            <Header withBackArrow>Группы</Header>

            <OffersListContainer>
                {groups.map(group => (
                    <OfferCard key={group.id} {...group.offer} />
                ))}
            </OffersListContainer>
        </Column>
    );
}

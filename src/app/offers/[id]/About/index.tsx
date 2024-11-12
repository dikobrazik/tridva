import {loadOfferAttributes} from '@/api';
import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import css from './About.module.scss';
import {ExpandableList} from './ExpandableList';

export default async function About({offerId, offerDescription}: {offerId: number; offerDescription: string}) {
    const attributes = await loadOfferAttributes({id: offerId});

    return (
        <Column className={css.about} gap={3}>
            <Text weight={600} size={16} lineHeight={20}>
                О товаре
            </Text>
            <ExpandableList description={offerDescription} attributes={attributes} />
        </Column>
    );
}

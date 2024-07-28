import {loadOfferAttributes} from '@/api';
import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import css from './About.module.scss';
import {ExpandableList} from './ExpandableList';

export default async function About({offerId}: {offerId: number}) {
    const attributes = await loadOfferAttributes({id: offerId});

    return (
        <Column className={css.about} gap={3}>
            <Text weight="600" size="16px" height={20}>
                О товаре
            </Text>
            <ExpandableList attributes={attributes} />
        </Column>
    );
}

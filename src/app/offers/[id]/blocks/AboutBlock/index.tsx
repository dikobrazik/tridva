import {loadOfferAttributes} from '@/api';
import {Text} from '@/components/Text';
import css from './About.module.scss';
import {ExpandableList} from './ExpandableList';
import {Block} from '@/components/layout/Block';

export default async function About({offerId, offerDescription = ''}: {offerId: number; offerDescription: string}) {
    const attributes = await loadOfferAttributes({id: offerId});

    return (
        <Block gap={3}>
            <Text weight={600} size={16} lineHeight={20}>
                О товаре
            </Text>
            <ExpandableList attributes={attributes} />
            <Text size={12} weight={400}>
                <div
                    className={css.description}
                    dangerouslySetInnerHTML={{__html: offerDescription.replace(/\s/g, ' ')}}
                ></div>
            </Text>
        </Block>
    );
}

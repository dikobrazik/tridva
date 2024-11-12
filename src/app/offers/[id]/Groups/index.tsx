import css from './Groups.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {loadOfferGroups} from '@/api';
import {pluralize} from '@/shared/utils/pluralize';
import {AboutGroups} from './About';
import {GroupsList} from './GroupsList';

type Props = {
    count: number;
    offerId: number;
};

export default async function Groups(props: Props) {
    const groups = await loadOfferGroups({id: props.offerId});

    return (
        <Column className={css.groups} gap={2}>
            <Column gap={1}>
                <Row justifyContent="space-between">
                    <Text weight="600" size={16} lineHeight={12}>
                        {/* @ts-expect-error TS2322 почему то name не определен в HtmlAnchoreElement */}
                        <a name="groups">Группы </a>
                        <Text weight="600" size={16} lineHeight={12} color="#3032347A">
                            {props.count}
                        </Text>
                    </Text>
                    <AboutGroups />
                </Row>
                <Text weight="400" size={10} lineHeight={12}>
                    {props.count} {pluralize(props.count, ['человек создал', 'человека создали', 'человек создали'])}{' '}
                    групповую покупку.
                    <br />
                    Если вы присоединитесь сейчас, то купите дешевле сразу
                </Text>
            </Column>

            <GroupsList groups={groups} />
        </Column>
    );
}

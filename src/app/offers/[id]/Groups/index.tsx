import css from './Groups.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {loadOffer, loadOfferGroups} from '@/api';
import {pluralize} from '@/shared/utils/pluralize';
import {AboutGroups} from './About';
import {GroupsList} from './GroupsList';

type Props = {
    offerId: number;
};

const NoGroups = () => {
    return (
        <Column alignItems="center" className={css.noGroups} padding="12px 8px" gap={2}>
            <Text size={14} weight={500}>
                Группы еще не созданы
            </Text>
            <Text size={12} weight={400}>
                Создайте группу, чтобы&nbsp;купить&nbsp;дешевле&nbsp;сразу
            </Text>
        </Column>
    );
};

export default async function Groups(props: Props) {
    const [groups, offer] = await Promise.all([loadOfferGroups({id: props.offerId}), loadOffer({id: props.offerId})]);

    const groupsCount = groups.length;

    return (
        <Column className={css.groups} gap={groupsCount > 0 ? 2 : 4}>
            <Column gap={1}>
                <Row justifyContent="space-between">
                    <Text weight="600" size={16} lineHeight={12}>
                        <a id="groups">Группы </a>
                        <Text weight="600" size={16} lineHeight={12} color="#3032347A">
                            {groupsCount}
                        </Text>
                    </Text>
                    <AboutGroups />
                </Row>
                {groupsCount > 0 && (
                    <Text weight="400" size={12} lineHeight={14}>
                        {groupsCount}{' '}
                        {pluralize(groupsCount, ['человек создал', 'человека создали', 'человек создали'])} групповую
                        покупку.
                        <br />
                        Если вы присоединитесь сейчас, то купите дешевле сразу
                    </Text>
                )}
            </Column>

            {groupsCount > 0 ? <GroupsList groups={groups} offer={offer} /> : <NoGroups />}
        </Column>
    );
}

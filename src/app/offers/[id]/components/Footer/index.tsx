import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Offer} from '@/types/offers';
import {AddGroupItem} from './AddGroupItem';
import {AddSignleItemButton} from './AddSingleItem';
import css from './Footer.module.scss';
import {BestGroup} from './BestGroup';
import {loadOfferGroup} from '@/api';
import classNames from 'classnames';
import {OfferContextProvider} from '../../context';

export default async function Footer({offer}: {offer: Offer}) {
    const bestGroup = await loadOfferGroup({id: offer.id});

    return (
        <OfferContextProvider offer={offer}>
            <Column className={classNames(css.container, 'absolute-fullwidth')}>
                <Row padding="8px 16px 4px">
                    <BestGroup group={bestGroup} />
                </Row>
                <Row
                    gap="2"
                    justifyContent="center"
                    className={css.buttonsContainer}
                    padding={bestGroup ? '4px 16px 8px' : '8px 16px'}
                    background="#fff"
                >
                    <AddSignleItemButton />
                    <AddGroupItem />
                </Row>
            </Column>
        </OfferContextProvider>
    );
}

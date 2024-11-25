'use client';

import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {BasketItem} from './item';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {BasketHeader} from './header';
import {Button} from '@/components/Button';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {basketSelectors} from '@/lib/features/basket';
import {Loader} from '@/components/Loader';
import {AuthorizationModal} from '../authorization/authorizationModal';
import {userSelectors} from '@/lib/features/user';
import Link from 'next/link';
import css from './Page.module.scss';
import {checkoutActions} from '@/lib/features/checkout';
import {LAST_SELECTED_BASKET_ITEMS_FOR_CHECKOUT} from '@/lib/constants';
import {formatPrice} from '@/shared/utils/formatPrice';
import {Summary} from './component/Summary';
import {sum} from '@/shared/utils/sum';
import {pluralize} from '@/shared/utils/pluralize';
import {useRouter} from 'next/navigation';

export default function Basket() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isUserAnonymous = useAppSelector(userSelectors.selectIsAnonymous);
    const basketItems = useAppSelector(basketSelectors.selectAll);
    const areBasketItemsLoading = useAppSelector(basketSelectors.selectAreBasketItemsLoading);
    const selectedBasketItems = useAppSelector(basketSelectors.selectSelectedBasketItems);
    const selectedItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const formattedSelectedItemsCost = formatPrice(selectedItemsCost);

    const onCheckoutClick = () => {
        const selectedBasketItemsIds = selectedBasketItems.map(({id}) => id);
        dispatch(checkoutActions.setSelectedBasketItems(selectedBasketItemsIds));
        localStorage.setItem(LAST_SELECTED_BASKET_ITEMS_FOR_CHECKOUT, JSON.stringify(selectedBasketItemsIds));
    };

    const onAuthorized = () => {
        onCheckoutClick();
        router.push('/basket/checkout');
    };

    const itemsCount = basketItems.length;

    return (
        <Column height="100%" justifyContent="space-between">
            <Column gap="2" flex="1" paddingBottom={88}>
                <BasketHeader />
                {areBasketItemsLoading && (
                    <Row justifyContent="center">
                        <Loader />
                    </Row>
                )}
                {basketItems.map(({id, group, count, offer}) => (
                    <Block key={id}>
                        <BasketItem
                            id={id}
                            capacity={group?.capacity ?? 0}
                            owner={group?.owner}
                            count={count}
                            offer={offer}
                        />
                    </Block>
                ))}
                {Boolean(itemsCount) && (
                    <Summary selectedItemsCount={sum(selectedBasketItems.map(item => item.count))} />
                )}
            </Column>

            {selectedItemsCost > 0 && (
                <Row className={css.checkoutButtonContainer} gap="6" padding="8px 16px 8px 16px" background="#fff">
                    <Column justifyContent="center" gap="1" width="70px">
                        <Text size={14} weight={600} whiteSpace="nowrap">
                            {formattedSelectedItemsCost}&nbsp;₽
                        </Text>
                        <Text size={10} weight={400} color="#303234A3">
                            {selectedBasketItems.length}&nbsp;
                            {pluralize(selectedBasketItems.length, ['товар', 'товара', 'товаров'])}
                        </Text>
                    </Column>

                    {!isUserAnonymous ? (
                        <Link className={css.checkoutLink} href="/basket/checkout" onClick={onCheckoutClick}>
                            <Button width="full">Оформить</Button>
                        </Link>
                    ) : (
                        <AuthorizationModal
                            title="Для оформления заказа войдите или зарегистрируйтесь"
                            onAuthorized={onAuthorized}
                            Toggler={({onClick}: {onClick: () => void}) => (
                                <Button onClick={onClick} width="full">
                                    Оформить
                                </Button>
                            )}
                        />
                    )}
                </Row>
            )}
        </Column>
    );
}

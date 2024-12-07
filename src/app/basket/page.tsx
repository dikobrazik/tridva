'use client';

import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {BasketItem} from './item';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {BasketHeader} from './header';
import {Button} from '@/components/Button';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {basketActions, basketSelectors, removeBasketItemAction} from '@/lib/features/basket';
import {Loader} from '@/components/Loader';
import {AuthorizationModal} from '../authorization/authorizationModal';
import {userSelectors} from '@/lib/features/user';
import Link from 'next/link';
import css from './Page.module.scss';
import {checkoutActions} from '@/lib/features/checkout';
import {formatPrice} from '@/shared/utils/formatPrice';
import {Summary} from './component/Summary';
import {sum} from '@/shared/utils/sum';
import {pluralize} from '@/shared/utils/pluralize';
import {useRouter} from 'next/navigation';
import {selectedBasketItemsStorage} from '@/shared/utils/local-storage/storages';
import {Box} from '@/components/layout/Box';
import {Checkbox} from '@/components/Checkbox';
import {Confirm} from '@/components/Confirm';

export default function Basket() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isUserAnonymous = useAppSelector(userSelectors.selectIsAnonymous);
    const basketItems = useAppSelector(basketSelectors.selectAll);
    const areBasketItemsLoading = useAppSelector(basketSelectors.selectAreBasketItemsLoading);
    const selectedBasketItems = useAppSelector(basketSelectors.selectSelectedBasketItems);
    const selectedItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const formattedSelectedItemsCost = formatPrice(selectedItemsCost);
    const isAllItemsSelected = useAppSelector(basketSelectors.selectIsAllBasketItemsSelected);

    const isBasketEmpty = basketItems.length === 0;

    const onDeleteAllSelected = () => {
        selectedBasketItems.forEach(({id}) => dispatch(removeBasketItemAction({id})));
    };

    const onToggleAllSelected = () => {
        dispatch(basketActions.toggleAllBasketItems());
    };

    const onCheckoutClick = () => {
        const selectedBasketItemsIds = selectedBasketItems.map(({id}) => id);
        dispatch(checkoutActions.setSelectedBasketItems(selectedBasketItemsIds));
        selectedBasketItemsStorage.set(selectedBasketItemsIds);
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
                {!isBasketEmpty && (
                    <Row paddingX={4} justifyContent="space-between">
                        <Box height={28}>
                            {selectedBasketItems.length > 0 && (
                                <Confirm
                                    title="Удалить товары"
                                    description={`Вы точно хотите удалить выбранные товары?\nОтменить действие будет невозможно`}
                                    onAcceptClick={onDeleteAllSelected}
                                    acceptButtonText="Удалить"
                                    renderButton={({onClick}) => (
                                        <Button size="s" icon="trash" variant="normal" onClick={onClick} />
                                    )}
                                />
                            )}
                        </Box>
                        <Row alignItems="center" gap={2} onClick={onToggleAllSelected}>
                            <Text selectable={false} size={14} weight={400} color="#303234A3">
                                Выбрать всё
                            </Text>
                            <Checkbox
                                name="all-selected"
                                checked={isAllItemsSelected}
                                onChange={onToggleAllSelected}
                            ></Checkbox>
                        </Row>
                    </Row>
                )}
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
                    <Box display="flex" flex="1">
                        <Column justifyContent="center" gap="1" width="70px">
                            <Text size={14} weight={600} whiteSpace="nowrap">
                                {formattedSelectedItemsCost}&nbsp;₽
                            </Text>
                            <Text size={10} weight={400} color="#303234A3">
                                {selectedBasketItems.length}&nbsp;
                                {pluralize(selectedBasketItems.length, ['товар', 'товара', 'товаров'])}
                            </Text>
                        </Column>
                    </Box>

                    <Box flex="2">
                        {!isUserAnonymous ? (
                            <Link className={css.checkoutLink} href="/basket/checkout" onClick={onCheckoutClick}>
                                <Button width="full">Оформить</Button>
                            </Link>
                        ) : (
                            <AuthorizationModal
                                title="Для оформления заказа войдите или зарегистрируйтесь"
                                onAuthorized={onAuthorized}
                                Toggler={({onClick}: {onClick: () => void}) => (
                                    <Button width="full" onClick={onClick}>
                                        Оформить
                                    </Button>
                                )}
                            />
                        )}
                    </Box>
                </Row>
            )}
        </Column>
    );
}

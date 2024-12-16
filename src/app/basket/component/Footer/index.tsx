'use client';

import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {basketSelectors} from '@/lib/features/basket';
import {checkoutActions} from '@/lib/features/checkout';
import {userSelectors} from '@/lib/features/user';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {formatPrice} from '@/shared/utils/formatPrice';
import {selectedBasketItemsStorage} from '@/shared/utils/local-storage/storages';
import {pluralize} from '@/shared/utils/pluralize';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {AuthorizationModal} from '../../../authorization/authorizationModal';
import css from './Footer.module.scss';

export const Footer = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isUserAnonymous = useAppSelector(userSelectors.selectIsAnonymous);
    const selectedBasketItems = useAppSelector(basketSelectors.selectSelectedBasketItems);
    const selectedItemsCost = useAppSelector(basketSelectors.selectSelectedOffersCost);
    const formattedSelectedItemsCost = formatPrice(selectedItemsCost);

    const onCheckoutClick = () => {
        const selectedBasketItemsIds = selectedBasketItems.map(({id}) => id);
        dispatch(checkoutActions.setSelectedBasketItems(selectedBasketItemsIds));
        selectedBasketItemsStorage.set(selectedBasketItemsIds);
    };

    const onAuthorized = () => {
        onCheckoutClick();
        router.push('/basket/checkout');
    };

    if (!selectedItemsCost) {
        return null;
    }

    return (
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
    );
};

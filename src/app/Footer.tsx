'use client';

import {Row} from '@/components/layout/Row';
import {FooterButton} from './FooterButton';
import css from './Layout.module.scss';
import {useAppSelector} from '@/lib/hooks';
import {basketSelectors} from '@/lib/features/basket';

export const Footer = () => {
    const basketItemsCount = useAppSelector(basketSelectors.selectBasketItemsCount);

    return (
        <Row className={css.footer} padding="8px 16px" justifyContent="space-between">
            <FooterButton icon="home" activeIcon="homeActive" title="Главная" href="/" strictActiveMatch />
            <FooterButton icon="menu" activeIcon="menuActive" title="Категории" href="/categories" />
            <FooterButton
                icon="cart"
                activeIcon="cartActive"
                title="Корзина"
                href="/basket"
                count={basketItemsCount > 0 ? basketItemsCount : undefined}
            />
            <FooterButton icon="user" activeIcon="userActive" title="Профиль" href="/profile" />
        </Row>
    );
};

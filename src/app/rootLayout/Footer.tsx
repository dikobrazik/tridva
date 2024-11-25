'use client';

import {Row} from '@/components/layout/Row';
import {FooterButton} from './FooterButton';
import css from './Footer.module.scss';
import {useAppSelector} from '@/lib/hooks';
import {basketSelectors} from '@/lib/features/basket';
import {Column} from '@/components/layout/Column';
import classNames from 'classnames';
import {usePathname} from 'next/navigation';

const pagesWithLocalFooter = ['/basket/checkout/success'];

export const Footer = () => {
    const pathname = usePathname();
    const basketItemsCount = useAppSelector(basketSelectors.selectBasketItemsCount);

    const isPageWithLocalFooter = pagesWithLocalFooter.includes(pathname);

    return (
        <Column className={classNames(css.footer, {[css.withoutShadow]: isPageWithLocalFooter})} padding="8px 16px">
            <Row justifyContent="space-between">
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
        </Column>
    );
};

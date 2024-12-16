import {Row} from '@/components/layout/Row';
import {FooterButton} from './FooterButton';
import css from './Footer.module.scss';
import {Column} from '@/components/layout/Column';
import classNames from 'classnames';
import {getBasketItems} from '@/api';

const pageWithLocalFooterRe = /([/]basket[/]checkout[/]success)|([/]basket)|([/]offers[/]\d)/;

export const Footer = async () => {
    const basketItemsCount = await getBasketItems().then(items => items.length);

    const isPageWithLocalFooter = pageWithLocalFooterRe.test('');

    return (
        <Column
            id="footer-container"
            className={classNames(css.footer, {[css.withoutShadow]: isPageWithLocalFooter})}
            padding="8px 16px"
        >
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

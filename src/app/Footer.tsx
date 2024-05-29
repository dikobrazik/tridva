import {Row} from '@/components/layout/Row';
import {FooterButton} from './FooterButton';
import css from './Layout.module.scss';

export const Footer = () => {
    return (
        <Row className={css.footer} padding="8px 16px" justifyContent="space-between">
            <FooterButton icon="home" activeIcon="homeActive" title="Главная" href="/" strictActiveMatch />
            <FooterButton icon="menu" activeIcon="menuActive" title="Категории" href="/categories" />
            <FooterButton icon="cart" activeIcon="cartActive" title="Корзина" href="/basket" />
            <FooterButton icon="user" activeIcon="userActive" title="Профиль" href="/profile" />
        </Row>
    );
};

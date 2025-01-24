import {Row} from '@/components/layout/Row';
import {FooterButton} from './FooterButton';
import {getBasketItemsCount} from '@/api';
import {FooterContainer} from './FooterContainer';

export const Footer = async () => {
    const basketItemsCount = await getBasketItemsCount().catch(() => 0);

    return (
        <FooterContainer>
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
        </FooterContainer>
    );
};

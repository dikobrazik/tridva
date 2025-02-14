import {Row} from '@/components/layout/Row';
import {FooterButton} from './FooterButton';
import {getBasketItemsCount} from '@/api';
import {FooterContainer} from './FooterContainer';
import {Suspense} from 'react';

const BasketButton = async () => {
    const basketItemsCount = await getBasketItemsCount().catch(() => 0);

    return (
        <FooterButton
            icon="cart"
            title="Корзина"
            href="/basket"
            count={basketItemsCount > 0 ? basketItemsCount : undefined}
        />
    );
};

export const Footer = () => {
    return (
        <FooterContainer>
            <Row justifyContent="space-between">
                <FooterButton icon="home" title="Главная" href="/" strictActiveMatch />
                <FooterButton icon="menu" title="Категории" href="/categories" />
                <Suspense fallback={<FooterButton icon="cart" title="Корзина" href="/basket" />}>
                    <BasketButton />
                </Suspense>
                <FooterButton icon="user" title="Профиль" href="/profile" />
            </Row>
        </FooterContainer>
    );
};

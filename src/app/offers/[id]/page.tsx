import {loadCategory, loadOffer} from '@/api';
import {Column} from '@/components/layout/Column';
import Image from 'next/image';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import cn from 'classnames';

type Props = {
    params: {id: string};
    searchParams: {};
};

export default async function Offer(props: Props) {
    const offer = await loadOffer({id: Number(props.params.id)});
    const category = await loadCategory({categoryId: Number(offer.categoryId)});

    const {title, photos, price} = offer;

    const imageSrc = photos?.length ? `${photos[0]}/700.jpg` : undefined;

    return (
        <Column>
            {imageSrc && <Image className={css.image} src={imageSrc} width={700} height={700} alt="offer image" />}
            <Column gap={2} paddingX="4" paddingY="2">
                <Row>
                    <Box className={css.category}>{category.name}</Box>
                </Row>
                <Text weight="600" size="24px">
                    {price} ₽
                </Text>
                <Text weight="600" size="16px">
                    {title}
                </Text>

                <Column gap={2}>
                    <Row gap={2}>
                        <Column className={css.tab} gap={1} paddingX="2" paddingY="2">
                            <Row gap={1}>
                                <Icon name="star" />
                                <Text weight="400" size="12px" height={16}>
                                    4.9
                                </Text>
                            </Row>
                            <Text weight="400" size="10px" height={12}>
                                123 отзыва
                            </Text>
                        </Column>
                        <Column className={css.tab} gap={1} paddingX="2" paddingY="2">
                            <Text weight="400" size="12px" height={16}>
                                300 заказов
                            </Text>
                            <Text weight="400" size="10px" height={12}>
                                за последние 30 дней
                            </Text>
                        </Column>
                        <Column className={css.tab} gap={1} paddingX="2" paddingY="2">
                            <Text weight="400" size="12px" height={16}>
                                2 группы
                            </Text>
                            <Text weight="400" size="10px" height={12}>
                                присоединитесь сейчас
                            </Text>
                        </Column>
                    </Row>
                    <Row className={css.tab} justifyContent="space-between" paddingX={2} paddingY={1}>
                        <Row alignItems="center" gap={1}>
                            <Icon name="delivery" />
                            <Text weight="400" size="10px" height={12}>
                                17 ноября, бесплатная доставка до пункта выдачи
                            </Text>
                        </Row>
                        <Box className={css.iconBox}>
                            <Icon name="help" />
                        </Box>
                    </Row>
                    <Row className={cn(css.tab, css.greentab)} alignItems="center" gap={2} paddingX={2} paddingY={1}>
                        <Icon name="crown" />
                        <Text weight="400" size="10px" height={12}>
                            Гарантия 100% сбора группы на первую созданную группу
                        </Text>
                    </Row>
                </Column>

                <Column className={css.groups} gap={2} padding="16px 0px 4px">
                    <Column gap={1}>
                        <Row justifyContent="space-between">
                            <Text weight="600" size="16px" height={12}>
                                Группы{' '}
                                <Text weight="600" size="16px" height={12}>
                                    2
                                </Text>
                            </Text>
                            <Row alignItems="center" gap={1}>
                                <Text weight="400" size="10px" height={12}>
                                    Как это работает
                                </Text>
                                <Icon name="help" />
                            </Row>
                        </Row>
                        <Text weight="400" size="10px" height={12}>
                            2 человека создали групповую покупку.
                            <br />
                            Если вы присоединитесь сейчас, то купите дешевле сразу
                        </Text>
                    </Column>

                    <ul className={css.groupsList}>
                        <li>
                            <Row justifyContent="space-between" paddingY={3}>
                                <Column gap={1}>
                                    <Row>
                                        <Box></Box>
                                        <Text weight="500" size="12px" height={14}>
                                            Арина С.
                                        </Text>
                                    </Row>
                                    <Text weight="400" size="10px" height={12}>
                                        Для покупки нужен еще 1 человек
                                    </Text>
                                    <Text weight="400" size="10px" height={12}>
                                        Закрытие группы через: 1:23:45
                                    </Text>
                                </Column>
                                <Box>
                                    <button className={css.groupsBtn}>
                                        <Text weight="600" size="12px" height={14}>
                                            Присоединиться
                                        </Text>
                                    </button>
                                </Box>
                            </Row>
                        </li>

                        <li>
                            <Row justifyContent="space-between" paddingY={3}>
                                <Column gap={1}>
                                    <Row>
                                        <Box></Box>
                                        <Text weight="500" size="12px" height={14}>
                                            Арина С.
                                        </Text>
                                    </Row>
                                    <Text weight="400" size="10px" height={12}>
                                        Для покупки нужен еще 1 человек
                                    </Text>
                                    <Text weight="400" size="10px" height={12}>
                                        Закрытие группы через: 1:23:45
                                    </Text>
                                </Column>
                                <Box>
                                    <button className={css.groupsBtn}>
                                        <Text weight="600" size="12px" height={14}>
                                            Присоединиться
                                        </Text>
                                    </button>
                                </Box>
                            </Row>
                        </li>
                    </ul>
                </Column>

                <Column className={css.about} paddingY={4} gap={3}>
                    <Text weight="600" size="16px" height={20}>
                        О товаре
                    </Text>
                    <ul className={css.aboutList}>
                        <li>
                            <Row justifyContent="space-between" paddingY={2}>
                                <Text weight="400" size="10px" height={12}>
                                    Цвет товара
                                </Text>
                                <Text weight="400" size="10px" height={12}>
                                    Черный
                                </Text>
                            </Row>
                        </li>
                        <li>
                            <Row justifyContent="space-between" paddingY={2}>
                                <Text weight="400" size="10px" height={12}>
                                    Принт
                                </Text>
                                <Text weight="400" size="10px" height={12}>
                                    Повседневный, Принт/Логотип
                                </Text>
                            </Row>
                        </li>
                        <li>
                            <Row justifyContent="space-between" paddingY={2}>
                                <Text weight="400" size="10px" height={12}>
                                    Состав
                                </Text>
                                <Text weight="400" size="10px" height={12}>
                                    хлопок 100%
                                </Text>
                            </Row>
                        </li>
                    </ul>
                    <button className={css.btn}>
                        <Text weight="500" size="12px" height={14} decoration="underline">
                            Все характеристики и описание
                        </Text>
                    </button>
                </Column>
            </Column>
        </Column>
    );
}

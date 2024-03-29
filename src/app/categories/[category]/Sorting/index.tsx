'use client';
import {Drawer} from '@/components/Drawer';
import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {useCallback, useState} from 'react';
import css from './Sorting.module.scss';

const SORTING = {
    POPULAR: 'POPULAR',
    NEW: 'NEW',
    PRICE_ASC: 'PRICE_ASC',
    PRICE_DESC: 'PRICE_DESC',
    DISCOUNT: 'DISCOUNT',
    RATING: 'RATING',
} as const;

const OPTIONS = {
    [SORTING.POPULAR]: 'Популярные',
    [SORTING.NEW]: 'Новинки',
    [SORTING.PRICE_ASC]: 'Сначала дешевые',
    [SORTING.PRICE_DESC]: 'Сначала дорогие',
    [SORTING.DISCOUNT]: 'По размеру скидки',
    [SORTING.RATING]: 'С высоким рейтингом',
};

export const Sorting = () => {
    const {isActive, toggle} = useToggler();
    const [selected, setSelected] = useState<Values<typeof SORTING>>(SORTING.POPULAR);

    const onOptionClick = useCallback(
        (option: Values<typeof SORTING>) => {
            toggle();
            setSelected(option);
        },
        [toggle, setSelected],
    );

    return (
        <>
            <Row onClick={toggle} alignItems="center" gap="2">
                <Text size={14} weight={500}>
                    {OPTIONS[selected]}
                </Text>
                <Icon name="switch" size="s"></Icon>
            </Row>
            <Drawer isOpen={isActive} onClose={toggle}>
                <Column gap={5}>
                    <Text size={16} weight={600}>
                        Сортировка
                    </Text>

                    <Column>
                        {Object.entries(OPTIONS).map(([value, name]) => (
                            <Row
                                onClick={onOptionClick.bind(null, value)}
                                key={value}
                                className={css.option}
                                paddingY={3}
                            >
                                <Text size={14} weight={500}>
                                    {name}
                                </Text>
                            </Row>
                        ))}
                    </Column>
                </Column>
            </Drawer>
        </>
    );
};

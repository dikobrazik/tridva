'use client';
import {Drawer} from '@/components/Drawer';
import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import {useCallback, useState} from 'react';
import css from './Sorting.module.scss';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const SORTING = {
    POPULAR: 'p',
    NEW: 'n',
    PRICE_ASC: 'asc',
    PRICE_DESC: 'desc',
    DISCOUNT: 'd',
    RATING: 'r',
};

const OPTIONS = {
    [SORTING.POPULAR]: 'Популярные',
    [SORTING.NEW]: 'Новинки',
    [SORTING.PRICE_ASC]: 'Сначала дешевые',
    [SORTING.PRICE_DESC]: 'Сначала дорогие',
    [SORTING.DISCOUNT]: 'По размеру скидки',
    [SORTING.RATING]: 'С высоким рейтингом',
} as Record<Values<typeof SORTING>, string>;

export const Sorting = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {isActive, toggle} = useToggler();
    const [selected, setSelected] = useState<Values<typeof SORTING>>(searchParams.get('order') ?? SORTING.POPULAR);

    const onOptionClick = useCallback(
        (option: Values<typeof SORTING>) => {
            if (option !== selected) {
                const params = new URLSearchParams(searchParams.toString());

                params.set('order', option);

                router.replace(pathname + '?' + params.toString());
                router.refresh();

                setSelected(option);
            }

            toggle();
        },
        [searchParams.toString(), router, pathname, searchParams, toggle, selected, setSelected],
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

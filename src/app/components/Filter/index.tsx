'use client';

import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {Column} from '@/components/layout/Column';
import css from './Filter.module.scss';
import {Box} from '@/components/layout/Box';
import {Button} from '@/components/Button';
import {useToggler} from '@/hooks/useToggler';
import {Drawer} from '@/components/Drawer';
import {MaskedTextField} from '@/components/TextField/Masked';
import {FormEventHandler} from 'react';
import {OffersFilters} from '@/types/offers';
import {useSearchParams} from 'next/navigation';

type Props = {
    onUpdate: (filters: OffersFilters) => void;
};

export default function Filter({onUpdate}: Props) {
    const params = useSearchParams();

    const {isActive, toggle} = useToggler();

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const priceFrom = formData.get('priceFrom');
        const priceTo = formData.get('priceTo');

        onUpdate({
            priceFrom: typeof priceFrom === 'string' ? priceFrom.replace(/\D/g, '') : undefined,
            priceTo: typeof priceTo === 'string' ? priceTo.replace(/\D/g, '') : undefined,
        });

        toggle();
    };

    return (
        <>
            <Icon name="audio" size="s" onClick={toggle} />
            <Drawer isOpen={isActive} onClose={toggle}>
                <form onSubmit={onSubmit}>
                    <Column gap="8">
                        {/* <Box>
                            <Box marginBottom="12px">
                                <Text size={16} lineHeight={20} weight={600}>
                                    Категории
                                </Text>
                            </Box>

                            <Column gap={2} paddingY={3} borderBottom="1px solid #9CA3AA52">
                                <Row justifyContent="space-between" alignItems="center">
                                    <Text size={14} lineHeight={18} weight={500}>
                                        Для кухни
                                    </Text>
                                    <Icon name="chevronRight" size="m"></Icon>
                                </Row>
                            </Column>

                            <Column gap={2} paddingY={3} borderBottom="1px solid #9CA3AA52">
                                <Row justifyContent="space-between" alignItems="center">
                                    <Text size={14} lineHeight={18} weight={500}>
                                        Для кухни
                                    </Text>
                                    <Icon name="chevronRight" size="m"></Icon>
                                </Row>
                                <Column gap={1} paddingX={4}>
                                    <label className={css.label}>
                                        <input className={css.checkbox} type="checkbox" />
                                        <Text size={14} lineHeight={18} weight={500}>
                                            Кухонные комбайны
                                        </Text>
                                    </label>
                                    <label className={css.label}>
                                        <input className={css.checkbox} type="checkbox" />
                                        <Text size={14} lineHeight={18} weight={500}>
                                            Кофемашины
                                        </Text>
                                    </label>
                                    <label className={css.label}>
                                        <input className={css.checkbox} type="checkbox" />
                                        <Text size={14} lineHeight={18} weight={500}>
                                            Микроволновые печи
                                        </Text>
                                    </label>
                                </Column>
                            </Column>

                            <Column gap={2} paddingTop="12px">
                                <label className={css.label}>
                                    <input className={css.checkbox} type="checkbox" />
                                    <Text size={14} lineHeight={18} weight={500}>
                                        Для кухни
                                    </Text>
                                </label>
                            </Column>
                        </Box> */}

                        <Column gap="4">
                            <Box>
                                <Text size={16} lineHeight={20} weight={600}>
                                    Цена
                                </Text>
                            </Box>

                            <Row className={css.inputContainer} gap="4" justifyContent="space-between">
                                <MaskedTextField
                                    size="m"
                                    name="priceFrom"
                                    placeholder="От"
                                    defaultValue={params.get('priceFrom') ?? undefined}
                                    maskOptions={{mask: Number, min: 0, max: 1_000_000, thousandsSeparator: ' '}}
                                />
                                <MaskedTextField
                                    size="m"
                                    name="priceTo"
                                    placeholder="До"
                                    defaultValue={params.get('priceTo') ?? undefined}
                                    maskOptions={{mask: Number, min: 0, max: 1_000_000, thousandsSeparator: ' '}}
                                />
                            </Row>
                        </Column>

                        <Button type="submit">Применить фильтры</Button>
                    </Column>
                </form>
            </Drawer>
        </>
    );
}

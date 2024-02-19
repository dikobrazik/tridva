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
import {TextField} from '@/components/TextField';

export default function Filter() {
    const {isActive, toggle} = useToggler();

    return (
        <>
            <Icon name="audio" size="s" onClick={toggle} />
            <Drawer isOpen={isActive} onClose={toggle}>
                <form onSubmit={e => e.preventDefault()}>
                    <Column gap="8">
                        <Box>
                            <Box marginBottom="12px">
                                <Text size={16} height={20} weight={600}>
                                    Категории
                                </Text>
                            </Box>

                            <Column gap={2} paddingY={3} borderBottom="1px solid #9CA3AA52">
                                <Row justifyContent="space-between" alignItems="center">
                                    <Text size={14} height={18} weight={500}>
                                        Для кухни
                                    </Text>
                                    <Icon name="chevronRight" size="m"></Icon>
                                </Row>
                            </Column>

                            <Column gap={2} paddingY={3} borderBottom="1px solid #9CA3AA52">
                                <Row justifyContent="space-between" alignItems="center">
                                    <Text size={14} height={18} weight={500}>
                                        Для кухни
                                    </Text>
                                    <Icon name="chevronRight" size="m"></Icon>
                                </Row>
                                <Column gap={1} paddingX={4}>
                                    <label className={css.label}>
                                        <input className={css.checkbox} type="checkbox" />
                                        <Text size={14} height={18} weight={500}>
                                            Кухонные комбайны
                                        </Text>
                                    </label>
                                    <label className={css.label}>
                                        <input className={css.checkbox} type="checkbox" />
                                        <Text size={14} height={18} weight={500}>
                                            Кофемашины
                                        </Text>
                                    </label>
                                    <label className={css.label}>
                                        <input className={css.checkbox} type="checkbox" />
                                        <Text size={14} height={18} weight={500}>
                                            Микроволновые печи
                                        </Text>
                                    </label>
                                </Column>
                            </Column>

                            <Column gap={2} paddingTop="12px">
                                <label className={css.label}>
                                    <input className={css.checkbox} type="checkbox" />
                                    <Text size={14} height={18} weight={500}>
                                        Для кухни
                                    </Text>
                                </label>
                            </Column>
                        </Box>

                        <Column gap="4">
                            <Box>
                                <Text size={16} height={20} weight={600}>
                                    Цена
                                </Text>
                            </Box>

                            <Row className={css.inputContainer} gap="4" justifyContent="space-between">
                                <TextField size="m" name="from" placeholder="От" />
                                <TextField size="m" name="to" placeholder="До" />
                            </Row>
                        </Column>

                        <Button>Применить фильтры</Button>
                    </Column>
                </form>
            </Drawer>
        </>
    );
}

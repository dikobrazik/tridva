import {Icon} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import css from './Filter.module.scss';
import {Box} from '@/components/layout/Box';

export default function Filter() {
    return (
        <div className={css.wrapper}>
            <form className={css.filter}>
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
                            <Icon name="chevron" size="m"></Icon>
                        </Row>
                    </Column>

                    <Column gap={2} paddingY={3} borderBottom="1px solid #9CA3AA52">
                        <Row justifyContent="space-between" alignItems="center">
                            <Text size={14} height={18} weight={500}>
                                Для кухни
                            </Text>
                            <Icon name="chevron" size="m"></Icon>
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

                <Column>
                    <Box marginBottom="16px">
                        <Text size={16} height={20} weight={600}>
                            Цена
                        </Text>
                    </Box>

                    <Row className={css.inputContainer} justifyContent="space-between">
                        <input className={css.input} name="from" placeholder="От" />
                        <input className={css.input} name="to" placeholder="До" />
                    </Row>
                </Column>

                <button className={css.button}>Применить фильтры</button>
            </form>
        </div>
    );
}

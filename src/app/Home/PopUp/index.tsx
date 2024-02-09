import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './PopUp.module.scss';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';

export default function PopUp() {
    return (
        <div className={css.background}>
            <Column gap={4} className={css.wrapper}>
                <Box height={48} width={48} className={css.imgBox} borderRadius={4} />
                <Column gap={3}>
                    <Text align="center" size={16} height={18} weight={600}>
                        Доставка
                    </Text>
                    <Text size={12} height={16} weight={400}>
                        Принцип организации покупки, который появился в середине 2000-х годов на стыке новых
                        возможностей интернет-коммуникаций по удалению избыточных посредников и неформальной системы
                        местных потребительских связей определённого города и региона. При совершении совместной покупки
                        несколько лиц приобретают товары непосредственно у поставщика или производителя по оптовым
                        ценам, независимо от страны его расположения. Такая покупка делается организатором нередко через
                        интернет-магазин или онлайн-аукцион.
                    </Text>
                </Column>
                <Row justifyContent="space-between">
                    <a className={css.link} href="/">
                        <Row alignItems="center">
                            <Box className={css.iconBox}>
                                <Icon name="chevron" size="s" />
                            </Box>
                            <Text size={12} height={16} weight={600}>
                                О сервисе
                            </Text>
                        </Row>
                    </a>
                    <a className={css.link} href="/">
                        <Row alignItems="center">
                            <Text size={12} height={16} weight={600}>
                                Пригласи друзей
                            </Text>
                            <Box className={css.iconBox}>
                                <Icon name="chevron" size="s" />
                            </Box>
                        </Row>
                    </a>
                </Row>
            </Column>
        </div>
    );
}

import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './PopUp.module.scss';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';

type PopUpProps = {
    title?: string;
    description?: string;
};

export default function PopUp(props: PopUpProps) {
    return (
        <Column gap={4}>
            <Box height={48} width={48} className={css.imgBox} borderRadius={4} />
            <Column gap={3}>
                <Text align="center" size={16} height={18} weight={600}>
                    {props.title}
                </Text>
                <Text size={12} height={16} weight={400}>
                    {props.description}
                </Text>
            </Column>
            <Row justifyContent="space-between">
                <a className={css.link} href="/">
                    <Row alignItems="center">
                        <Box className={css.iconBox}>
                            <Icon name="chevronRight" size="s" />
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
                            <Icon name="chevronRight" size="s" />
                        </Box>
                    </Row>
                </a>
            </Row>
        </Column>
    );
}

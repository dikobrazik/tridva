import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './InformationRow.module.scss';
import {Text} from '@/components/Text';

const InformationList = [
    {title: 'О\u00A0групповых покупках', description: ''},
    {title: 'Доставка', description: ''},
    {title: 'Помощь', description: ''},
    {title: 'Получи бесплатно', description: ''},
    {title: 'Выгодные товары дня', description: ''},
];

export default function InformationRow() {
    return (
        <Row justifyContent="space-between" paddingY={2} paddingX={4}>
            {InformationList.map((information, index) => (
                <Column gap={2} className={css.information} key={index}>
                    <Box height={48} width={48} className={css.box} borderRadius={4} />
                    <Text size={8} align="center">
                        {information.title}
                    </Text>
                </Column>
            ))}
        </Row>
    );
}

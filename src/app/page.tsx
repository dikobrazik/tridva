import {Column} from '@/components/layout/Column';
import InformationRow from './Home/InformationRow';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {OfferCard} from '@/components/OfferCard';
import css from './Page.module.scss';
import {Box} from '@/components/layout/Box';

export default async function Home() {
    return (
        <Column>
            <Column paddingBottom="8px" borderBottom="4px solid #F5F5F5">
                <Row gap={2} overflowX="auto" paddingBottom="8px" paddingX={4}>
                    <button className={css.headerButton}>
                        <Text size={12}>Посуда</Text>
                    </button>
                    <button className={css.headerButton}>
                        <Text size={12}>Творчество</Text>
                    </button>
                    <button className={css.headerButton}>
                        <Text size={12}>Акции</Text>
                    </button>
                    <button className={css.headerButton}>
                        <Text space="nowrap" size={12}>
                            Детские товары
                        </Text>
                    </button>
                </Row>
                <InformationRow />
            </Column>

            <Column paddingY={2} paddingX={4}>
                <Box paddingY={4}>
                    <Text weight={600} size={20}>
                        Рекомендации для вас
                    </Text>
                </Box>

                <Box className={css.grid}>
                    {Array(11)
                        .fill(undefined)
                        .map((_, index) => (
                            <OfferCard
                                key={index}
                                id={1}
                                cost="1499"
                                description="dwa"
                                title={`Подвес на зеркало "Утка" высота 8 см, шнурок 50 см`}
                            />
                        ))}
                </Box>
            </Column>
        </Column>
    );
}

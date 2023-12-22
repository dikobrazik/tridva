import {Column} from '@/components/layout/Column';
import InformationRow from './Home/InformationRow';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {OfferCard} from '@/components/OfferCard';

export default async function Home() {
    return (
        <Column gap={4}>
            <InformationRow />
            <Text weight={600} size={20}>
                Рекомендации для вас
            </Text>

            <Row flexWrap="wrap">
                {Array(40)
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
            </Row>
        </Column>
    );
}

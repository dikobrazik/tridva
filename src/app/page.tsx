import {Column} from '@/components/layout/Column';
import InformationRow from './Home/InformationRow';
import {Text} from '@/components/Text';

export default async function Home() {
    return (
        <Column gap={4}>
            <InformationRow />
            <Text weight={600} size={20}>
                Рекомендации для вас
            </Text>
        </Column>
    );
}

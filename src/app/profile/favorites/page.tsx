import {Header} from '@/components/Header';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';

export default function FavoritesPage() {
    return (
        <Column height="100%" backgroundColor="#fff" gap="2">
            <Header withBackArrow>Избранное</Header>

            <Column alignItems="center">
                <Text size={12} weight={500} color="#303234A3">
                    Возможно скоро здесь что-нибудь появится
                </Text>
            </Column>
        </Column>
    );
}

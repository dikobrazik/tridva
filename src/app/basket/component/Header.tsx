import {Header} from '@/components/Header';
import {Text} from '@/components/Text';

type Props = {
    count?: number;
};

export const BasketHeader = ({count}: Props) => {
    return (
        <Header>
            Корзина{' '}
            {count ? (
                <Text size={16} weight={600} color="#3032347A">
                    {count}
                </Text>
            ) : null}
        </Header>
    );
};

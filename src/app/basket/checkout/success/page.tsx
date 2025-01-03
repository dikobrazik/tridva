import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';

import {Button} from '@/components/Button';
import {Header} from '@/components/Header';
import Link from 'next/link';
import {Footer} from '@/components/Footer';

export default function SuccessOrder() {
    return (
        <Column backgroundColor="#fff" height="100%" justifyContent="space-between">
            <Header>Заказ оплачен</Header>

            <Column alignItems="center" gap={2}>
                <Text size={24}>🎉</Text>
                <Column alignItems="center" gap={1} paddingX="10">
                    <Text size={16} weight={600} color="#4FDE38">
                        Спасибо за заказ!
                    </Text>
                    <Text align="center" size={14} weight={400} color="#303234A3">
                        Статус заказа вы можете отслеживать в личном кабинете
                    </Text>
                </Column>
            </Column>

            <Footer>
                <Column gap={2} width="100%">
                    <Link href="/">
                        <Button width="full" variant="action">
                            Вернуться к покупкам
                        </Button>
                    </Link>
                    <Link href="/profile/orders">
                        <Button width="full" variant="outline">
                            Перейти в личный кабинет
                        </Button>
                    </Link>
                </Column>
            </Footer>
        </Column>
    );
}

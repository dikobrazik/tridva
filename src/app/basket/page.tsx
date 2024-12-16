import {Column} from '@/components/layout/Column';
import {Empty} from './component/Empty';
import {Controls} from './component/Controls';
import {Footer} from './component/Footer';
import {Summary} from './component/Summary';
import {BasketHeader} from './component/Header';
import {getBasketItems} from '@/api';
import {List} from './component/List';
import {PageParams} from '@/shared/types/next';

type Props = PageParams<{p: string}>;

export default async function Basket(props: Props) {
    const basketItems = await getBasketItems();
    const isBasketEmpty = basketItems.length === 0;

    if (isBasketEmpty) {
        return <Empty page={props.searchParams.p} />;
    }

    return (
        <Column height="100%" justifyContent="space-between">
            <Column gap="2" flex="1" paddingBottom={88}>
                <BasketHeader count={basketItems.length} />

                <Column gap="2">
                    <Controls />
                    <List />
                    <Summary />
                </Column>
            </Column>

            <Footer />
        </Column>
    );
}

'use client';

import {Button} from '@/components/Button';
import {Checkbox} from '@/components/Checkbox';
import {Confirm} from '@/components/Confirm';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Row} from '@/components/layout/Row';
import {basketActions, basketSelectors, removeBasketItemAction} from '@/lib/features/basket';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';

export const Controls = () => {
    const dispatch = useAppDispatch();
    const selectedBasketItems = useAppSelector(basketSelectors.selectSelectedBasketItems);
    const isAllItemsSelected = useAppSelector(basketSelectors.selectIsAllBasketItemsSelected);

    const onDeleteAllSelected = () => {
        selectedBasketItems.forEach(({id}) => dispatch(removeBasketItemAction({id})));
    };

    const onToggleAllSelected = () => {
        dispatch(basketActions.toggleAllBasketItems());
    };

    return (
        <Row paddingX={4} justifyContent="space-between">
            <Box height={28}>
                {selectedBasketItems.length > 0 && (
                    <Confirm
                        title="Удалить товары"
                        description={`Вы точно хотите удалить выбранные товары?\nОтменить действие будет невозможно`}
                        onAcceptClick={onDeleteAllSelected}
                        acceptButtonText="Удалить"
                        renderButton={({onClick}) => (
                            <Button size="s" icon="trash" variant="normal" onClick={onClick} />
                        )}
                    />
                )}
            </Box>
            <Row alignItems="center" gap={2} onClick={onToggleAllSelected}>
                <Text selectable={false} size={14} weight={400} color="#303234A3">
                    Выбрать всё
                </Text>
                <Checkbox name="all-selected" checked={isAllItemsSelected} onChange={onToggleAllSelected}></Checkbox>
            </Row>
        </Row>
    );
};

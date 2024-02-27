'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';

export const NewReviewDrawer = () => {
    const {isActive, toggle} = useToggler();
    return (
        <>
            <Button paddingY="2" variant="outline" onClick={toggle}>
                Написать отзыв
            </Button>

            <Drawer isOpen={isActive} onClose={toggle}>
                <Column gap="6">
                    <Text size="16px" weight={600}>
                        Поделитесь впечатлением о товаре
                    </Text>
                    <span>Ваша оценка:</span>
                    <span>Напишите отзыв</span>
                    <TextField />
                    <Button>Отправить отзыв</Button>
                </Column>
            </Drawer>
        </>
    );
};

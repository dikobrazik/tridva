'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Label} from '@/components/Label';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {updateProfileNameAction, userSelectors} from '@/lib/features/user';
import {useAppDispatch} from '@/lib/hooks';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

type Props = {
    isOpen: boolean;
    toggle: () => void;
};

export const NameDrawer = ({isOpen, toggle}: Props) => {
    const dispatch = useAppDispatch();
    const profile = useSelector(userSelectors.selectProfile);

    const [value, setValue] = useState(profile?.name ?? '');

    useEffect(() => {
        setValue(profile.name ?? '');
    }, [profile.name]);

    const onSaveClick = () => {
        dispatch(updateProfileNameAction(value)).then(() => {
            toggle();
        });
    };

    return (
        <Drawer isOpen={isOpen} onClose={toggle}>
            <Column gap="6">
                <Text size={16} weight={600}>
                    Изменить имя
                </Text>

                <Label text="Имя">
                    <TextField value={value} onChange={setValue} />
                </Label>

                <Button onClick={onSaveClick}>Сохранить</Button>
            </Column>
        </Drawer>
    );
};

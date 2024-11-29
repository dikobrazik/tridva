'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Label} from '@/components/Label';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {updateProfileEmailAction, userSelectors} from '@/lib/features/user';
import {useAppDispatch} from '@/lib/hooks';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

type Props = {
    isOpen: boolean;
    toggle: () => void;
};

export const EmailDrawer = ({isOpen, toggle}: Props) => {
    const dispatch = useAppDispatch();
    const profile = useSelector(userSelectors.selectProfile);

    const [value, setValue] = useState(profile?.email ?? '');

    useEffect(() => {
        setValue(profile.email ?? '');
    }, [profile.email]);

    const onSaveClick = () => {
        dispatch(updateProfileEmailAction(value))
            .unwrap()
            .then(() => {
                toggle();
            });
    };

    return (
        <Drawer isOpen={isOpen} onClose={toggle}>
            <Column gap="6">
                <Text size={16} weight={600}>
                    Электронная почта
                </Text>

                <Label text="Электронная почта">
                    <TextField value={value} onChange={setValue} />
                </Label>

                <Button onClick={onSaveClick}>Сохранить</Button>
            </Column>
        </Drawer>
    );
};

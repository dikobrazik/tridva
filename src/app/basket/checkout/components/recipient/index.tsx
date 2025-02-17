import {Button} from '@/components/Button';
import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {userSelectors} from '@/lib/features/user';
import {useAppSelector} from '@/lib/hooks';
import {useEffect, useState} from 'react';

export const RecipientForm = () => {
    const [isEditing, setIsEditing] = useState(false);

    const phone = useAppSelector(userSelectors.selectPhone);
    const profile = useAppSelector(userSelectors.selectProfile);

    const name = profile?.name ?? '';

    useEffect(() => {
        if (!name) {
            setIsEditing(true);
        }
    }, []);

    // if (!isEditing) {
    //     return (
    //         <Column gap={4}>
    //             <Text size={14} weight={400} color="#303234">
    //                 {name}, {phone}
    //             </Text>

    //             <Button onClick={() => setIsEditing(true)} width="full" variant="normal" size="m">
    //                 Редактировать
    //             </Button>
    //         </Column>
    //     );
    // }

    return (
        <Column gap={isEditing ? 2 : 0}>
            {!isEditing && (
                <Column gap={4}>
                    <Text size={14} weight={400} color="#303234">
                        {name}, {phone}
                    </Text>

                    <Button onClick={() => setIsEditing(true)} width="full" variant="normal" size="m">
                        Редактировать
                    </Button>
                </Column>
            )}

            <TextField
                hidden={!isEditing}
                type="text"
                required
                placeholder="Имя*"
                name="name"
                defaultValue={profile?.name ?? ''}
            />
            <TextField
                placeholder="E-mail"
                hidden={!isEditing}
                type="email"
                name="email"
                defaultValue={profile?.email ?? ''}
            />
            <TextField
                disabled
                hidden={!isEditing}
                type="tel"
                placeholder="Номер телефона"
                name="phone"
                defaultValue={phone}
            />
            {isEditing && (
                <Text size={12} weight={400} color="#303234A3">
                    Пришлем статус заказа по e-mail и в SMS
                </Text>
            )}
        </Column>
    );
};

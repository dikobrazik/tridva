import {Button} from '@/components/Button';
import {Column} from '@/components/layout/Column';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {userSelectors} from '@/lib/features/user';
import {useAppSelector} from '@/lib/hooks';
import {useState} from 'react';

export const RecipientForm = () => {
    const [isEditing, setIsEditing] = useState(false);

    const phone = useAppSelector(userSelectors.selectPhone);
    const profile = useAppSelector(userSelectors.selectProfile);

    const [name, setName] = useState(profile?.name ?? '');
    const [email, setEmail] = useState(profile?.email ?? '');

    if (name && phone && !isEditing) {
        return (
            <Column gap={4}>
                <Text size={14} weight={400} color="#303234">
                    {name}, {phone}
                </Text>

                <Button onClick={() => setIsEditing(true)} width="full" variant="normal" size="m">
                    Редактировать
                </Button>
            </Column>
        );
    }

    return (
        <Column gap="2">
            <TextField placeholder="Имя*" name="name" value={name} onChange={setName} />
            <TextField placeholder="E-mail" type="email" name="email" value={email} onChange={setEmail} />
            <TextField disabled placeholder="Номер телефона" name="phone" value={phone} />
            <Text size={12} weight={400} color="#303234A3">
                Пришлем статус заказа по e-mail и в SMS
            </Text>
        </Column>
    );
};

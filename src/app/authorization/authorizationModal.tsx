import {checkCode, getCode} from '@/api';
import {Button} from '@/components/Button';
import {Label} from '@/components/Label';
import {Modal} from '@/components/Modal';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import React, {useState} from 'react';

type Props = {
    Toggler: (props: {onClick: () => void}) => React.JSX.Element;
};

export const AuthorizationModal = ({Toggler}: Props) => {
    const {isActive, toggle} = useToggler();

    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const onSendCodeClick = async () => {
        await getCode({phone});

        setIsCodeSent(true);
    };

    const onCheckCodeClick = async () => {
        await checkCode({phone, code});

        setIsCodeSent(false);
        toggle();
    };

    return (
        <>
            <Toggler onClick={toggle} />
            <Modal isOpen={isActive} onClose={toggle}>
                <Column gap="6">
                    <Text size={16} weight={600}>
                        Изменить номер телефона
                    </Text>
                    <Label text="Телефон">
                        <TextField
                            disabled={isCodeSent}
                            value={phone}
                            onChange={setPhone}
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        />
                    </Label>
                    {isCodeSent && (
                        <Label text="Код из СМС">
                            <TextField value={code} onChange={setCode} type="number" maxLength={4} />
                        </Label>
                    )}
                    <Button onClick={isCodeSent ? onCheckCodeClick : onSendCodeClick}>
                        {isCodeSent ? 'Подтвердить' : 'Получить код'}
                    </Button>
                </Column>
            </Modal>
        </>
    );
};

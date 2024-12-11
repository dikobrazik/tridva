import {getCode} from '@/api';
import {Button} from '@/components/Button';
import {Label} from '@/components/Label';
import {Modal} from '@/components/Modal';
import {Text} from '@/components/Text';
import {MaskedTextField} from '@/components/TextField/Masked';
import {PhoneTextField} from '@/components/TextField/Phone';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {useTimer} from '@/hooks/useTimer';
import {useToggler} from '@/hooks/useToggler';
import {checkCodeAction, userSelectors} from '@/lib/features/user';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';

type Props = {
    title: string;
    Toggler: (props: {onClick: () => void}) => React.JSX.Element;
    onAuthorized?: () => void;
};

export const AuthorizationModal = ({title, Toggler, onAuthorized}: Props) => {
    const dispatch = useAppDispatch();
    const {isActive, toggle} = useToggler();

    const {startTimer, seconds} = useTimer();

    const initialPhone = useAppSelector(userSelectors.selectPhone);

    const [phone, setPhone] = useState(initialPhone ?? '');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    useEffect(() => {
        setPhone(initialPhone ?? '');
    }, [initialPhone]);

    const onSendCodeClick = async () => {
        try {
            await getCode({phone});
            startTimer(60);
        } catch (e: unknown) {
            const response = (e as AxiosError<{leftSeconds: number}>).response;

            if (response && response.data && 'leftSeconds' in response.data) {
                startTimer(response.data.leftSeconds);
            }
        }

        setIsCodeSent(true);
    };

    const onCheckCodeClick = async () => {
        dispatch(checkCodeAction({phone, code})).then(() => {
            setIsCodeSent(false);
            toggle();
            if (onAuthorized) onAuthorized();
        });
    };

    return (
        <>
            <Toggler onClick={toggle} />
            <Modal isOpen={isActive} onClose={toggle}>
                <Column gap="4">
                    <Column gap="2">
                        <Text size={16} weight={600}>
                            {title}
                        </Text>
                        <Text size={10} weight={400}>
                            Введите номер телефона, мы пришлем СМС с кодом подтверждения
                        </Text>
                    </Column>
                    <Label text="Телефон">
                        <PhoneTextField disabled={isCodeSent} value={phone} onChange={setPhone} placeholder="+7" />
                    </Label>
                    {true && (
                        <Column gap="4">
                            <Label text="Код из СМС">
                                <MaskedTextField
                                    maskOptions={{mask: '000-000', lazy: false}}
                                    value={code}
                                    onChange={setCode}
                                />
                            </Label>
                            {seconds > 0 ? (
                                <Text weight={400} size={10} color="#303234A3">
                                    Отправить код повторно через {seconds}с
                                </Text>
                            ) : (
                                <Box onClick={onSendCodeClick}>
                                    <Text size={10} weight={500} color="#F40C43">
                                        Отправить код повторно
                                    </Text>
                                </Box>
                            )}
                        </Column>
                    )}

                    <Button disabled={phone.length !== 10} onClick={isCodeSent ? onCheckCodeClick : onSendCodeClick}>
                        {isCodeSent ? 'Подтвердить' : 'Получить код'}
                    </Button>
                </Column>
            </Modal>
        </>
    );
};

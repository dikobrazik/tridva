'use client';
import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useToggler} from '@/hooks/useToggler';
import Image from 'next/image';
import participantImage from './participant.svg';
import Link from 'next/link';
import {useState} from 'react';

const GroupHost = () => {
    return (
        <Column flex="1" gap="2" alignItems="center">
            <Image src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png" width="48" height="48" alt="avatar" />
            <Column gap="1">
                <Text size={12} weight={500}>
                    Михаил Кириллов
                </Text>
                <Text align="center" size={10} weight={400} color="#303234A3">
                    Создатель группы
                </Text>
            </Column>
        </Column>
    );
};

const GroupParticipant = () => {
    return (
        <Column flex="1" gap="2" alignItems="center">
            <Image src={participantImage} width="48" height="48" alt="avatar" />
            <Column gap="1">
                <Text align="center" size={12} weight={600}>
                    Для групповой покупки нужен ещё{' '}
                    <Text weight={600} color="#F40C43">
                        1 человек
                    </Text>
                </Text>
            </Column>
        </Column>
    );
};

const JoinGroupContent = ({onGroupJoined}: {onGroupJoined: (joined: boolean) => void}) => {
    return (
        <Column gap="10">
            <Column alignItems="center" gap="1">
                <Text size={16} weight={600}>
                    Присоединитесь к групповой покупке
                </Text>
                <Text align="center" size={10} weight={400} color="#303234A3">
                    Если вы присоединитесь сейчас, то купите дешевле сразу
                </Text>
            </Column>
            <Row>
                <GroupHost />
                <GroupParticipant />
            </Row>
            <Column gap="4" alignItems="center">
                <Text size={12} weight={500}>
                    Закрытие группы через: <Text color="#303234A3">23:19:00</Text>
                </Text>
                <Button width="full" onClick={() => onGroupJoined(true)}>
                    Присоединиться к этой группе
                </Button>
            </Column>
        </Column>
    );
};

const GroupJoinedContent = () => {
    return (
        <Column gap="10">
            <Column gap="2" alignItems="center">
                🥳
                <Text align="center" size={16} weight={600} color="#4FDE38">
                    Группа собрана!
                </Text>
            </Column>
            <Column gap="2" alignItems="center">
                <Text size={14} weight={500}>
                    Товар добавлен в корзину
                </Text>
                <Text align="center" size={10} weight={400} color="#303234A3">
                    Оплатите товар, чтобы подтвердить участие
                </Text>
            </Column>
            <Button width="full">
                <Link href="/cart">Перейти в корзину и оплатить</Link>
            </Button>
        </Column>
    );
};

export const JoinGroupDrawer = () => {
    const [isGroupJoined, setGroupJoined] = useState(false);

    const {isActive, toggle} = useToggler();

    return (
        <>
            <Button onClick={toggle} size="m">
                Присоединиться
            </Button>
            <Drawer isOpen={isActive} onClose={toggle}>
                {isGroupJoined ? <GroupJoinedContent /> : <JoinGroupContent onGroupJoined={setGroupJoined} />}
            </Drawer>
        </>
    );
};

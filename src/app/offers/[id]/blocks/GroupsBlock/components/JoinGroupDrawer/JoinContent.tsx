'use client';

import {ProfileAvatar} from '@/components/Avatar';
import {Button} from '@/components/Button';
import {LeftTime} from '@/components/LeftTime';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {putGroupToBasketAction} from '@/lib/features/basket';
import {useAppDispatch} from '@/lib/hooks';
import Image from 'next/image';
import participantImage from './participant.svg?url';
import {useGroup} from '../../context';

const GroupHost = ({ownerId, ownerName}: {ownerId: number; ownerName: string}) => {
    return (
        <Column flex="1" gap="2" alignItems="center">
            <ProfileAvatar id={ownerId} width={48} height={48} />
            <Column gap="1">
                <Text align="center" size={12} weight={500}>
                    {ownerName}
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
                <Text align="center" size={12} weight={500}>
                    Для групповой покупки нужен ещё{' '}
                    <Text weight={600} color="#F40C43">
                        1 человек
                    </Text>
                </Text>
            </Column>
        </Column>
    );
};

export const JoinGroupContent = ({onGroupJoined}: {onGroupJoined: () => void}) => {
    const group = useGroup();
    const dispatch = useAppDispatch();

    const {id, ownerId, ownerName, createdAt} = group;

    const onJoinGroupClick = async () => {
        dispatch(putGroupToBasketAction({groupId: id}))
            .unwrap()
            .then(() => onGroupJoined());
    };

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
                <GroupHost ownerId={ownerId} ownerName={ownerName} />
                <GroupParticipant />
            </Row>
            <Column gap="4" alignItems="center">
                <Text size={12} weight={500}>
                    Закрытие группы через:{' '}
                    <Text color="#F40C43">
                        <LeftTime createdAt={new Date(createdAt)} />
                    </Text>
                </Text>
                <Button width="full" onClick={onJoinGroupClick}>
                    Присоединиться к этой группе
                </Button>
            </Column>
        </Column>
    );
};

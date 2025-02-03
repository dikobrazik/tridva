'use client';

import {Button} from '@/components/Button';
import {Confirm} from '@/components/Confirm';
import {Icon} from '@/components/Icon';
import {LeftTime} from '@/components/LeftTime';
import {OfferOrderBlock} from '@/components/OfferCard/OfferOrderBlock';
import {Text} from '@/components/Text';
import {Block} from '@/components/layout/Block';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {useCopyGroupInviteLink} from '@/hooks/useCopyGroupInviteLink';
import {notificationsActions} from '@/lib/features/notifications';
import {useAppDispatch} from '@/lib/hooks';
import {pluralize} from '@/shared/utils/pluralize';
import {Group} from '@/types/group';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

type Props = {
    group: Group;
};

export const GroupItem = ({group}: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {onInviteClick} = useCopyGroupInviteLink();

    const onRecieptClick = () => {
        dispatch(
            notificationsActions.showNotification({
                icon: 'checkWhite',
                text: 'Отправили чек на электронную почту',
            }),
        );
    };

    const onExitGroupClick = () => {
        dispatch(
            notificationsActions.showNotification({
                text: 'Вы покинули группу',
            }),
        );
        router.refresh();
    };

    const left = group.capacity - group.participantsCount;

    return (
        <Block gap={6}>
            <Column gap={2}>
                <Row gap={1}>
                    <Icon name="hourglass" />
                    <Text size={12} weight={500}>
                        Группа собирается
                    </Text>
                </Row>

                <Column gap={1}>
                    <Text size={10} weight={400} color="#303234A3">
                        Для групповой покупки {pluralize(left, [`нужен `, `нужно `, `нужно `])} еще
                        <Text color="#f40c43">
                            {pluralize(left, [` ${left} человек`, ` ${left} человека`, ` ${left} человек`])}
                        </Text>
                    </Text>
                    <Text size={10} weight={400} color="#303234A3">
                        До конца сбора:{' '}
                        <Text weight={500} color="#F40C43">
                            <LeftTime createdAt={group.createdAt} />
                        </Text>
                    </Text>
                </Column>
            </Column>

            <Link href={`/offers/${group.offer.id}`}>
                <OfferOrderBlock isGroupItem withBorder offer={group.offer} imageSize={68} />
            </Link>

            <Column gap={2}>
                <Button onClick={() => onInviteClick(group.id)} size="m">
                    Пригласить друзей в группу
                </Button>

                <Button onClick={onRecieptClick} size="m" variant="action-white">
                    <Text color="#303234A3">Электронный чек</Text>
                </Button>

                <Confirm
                    title="Вы уверены, что хотите покинуть группу?"
                    description="После выхода из группы деньги вернутся к вам в течении 14 рабочих дней"
                    acceptButtonText="Все равно покинуть группу"
                    cancelButtonText="Остаться"
                    onAcceptClick={onExitGroupClick}
                    renderButton={({onClick}) => (
                        <Button size="m" variant="action-white" onClick={onClick}>
                            <Text color="#F4420C">Выйти из группы и вернуть деньги</Text>
                        </Button>
                    )}
                ></Confirm>
            </Column>
        </Block>
    );
};

'use client';

import {Button} from '@/components/Button';
import {Drawer} from '@/components/Drawer';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';
import {useRouter} from 'next/navigation';
import {ReactNode, useEffect, useState} from 'react';
import {JoinGroupContent} from './JoinContent';
import {GroupJoinedContent} from './JoinedContent';

type Props = {
    renderTrigger?: (props: {onClick: () => void}) => ReactNode;
};

export const JoinGroupDrawer = ({renderTrigger}: Props) => {
    const router = useRouter();
    const [isGroupJoined, setGroupJoined] = useState(false);

    const {isActive, toggleOn: openJoinGroupDrawer, toggleOff: closeJoinGroupDrawer} = useToggler();

    const onGroupJoined = () => {
        setGroupJoined(true);
    };

    useEffect(() => {
        if (isActive) {
            setGroupJoined(false);
        }
    }, [isActive]);

    const onClose = () => {
        closeJoinGroupDrawer();
        router.refresh();
    };

    return (
        <>
            {renderTrigger ? (
                renderTrigger({onClick: openJoinGroupDrawer})
            ) : (
                <Button onClick={openJoinGroupDrawer} size="m">
                    <Text size={12}>Присоединиться</Text>
                </Button>
            )}
            <Drawer isOpen={isActive} onClose={onClose}>
                {isGroupJoined ? <GroupJoinedContent /> : <JoinGroupContent onGroupJoined={onGroupJoined} />}
            </Drawer>
        </>
    );
};

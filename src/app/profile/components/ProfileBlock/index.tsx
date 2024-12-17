import {loadUser} from '@/api';
import {RandomAvatar} from '@/components/Avatar';
import {Icon} from '@/components/Icon';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import Link from 'next/link';
import {AnonymousProfile} from './AnonymousProfile';

export const ProfileBlock = async () => {
    const {isAnonymous, profile, phone} = await loadUser();

    if (isAnonymous) {
        return <AnonymousProfile />;
    }

    return (
        <Link href="/profile/edit">
            <Row gap="4" justifyContent="space-between" alignItems="center">
                <Row gap="4" alignItems="center">
                    <RandomAvatar id={profile.id} width={48} height={48} />
                    <Column gap="1">
                        <Text size={16} weight={600}>
                            {profile?.name}
                        </Text>
                        <Text size={10} weight={400} color="#303234A3">
                            +7{phone}
                        </Text>
                    </Column>
                </Row>
                <Icon name="chevronRight" />
            </Row>
        </Link>
    );
};

'use client';

import {Avatar} from '@/components/Avatar';
import {Icon} from '@/components/Icon';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
// import {offersSelectors} from '@/lib/features/offers';
import {userSelectors} from '@/lib/features/user';
import Link from 'next/link';
import {useSelector} from 'react-redux';

export const ProfileBlock = () => {
    const profile = useSelector(userSelectors.selectProfile);
    const phone = useSelector(userSelectors.selectPhone);
    // const favoriteOffersCount = useSelector(offersSelectors.selectFavoriteOffersCount);

    return (
        <Link href="/profile/edit">
            <Row gap="4" justifyContent="space-between" alignItems="center">
                <Row gap="4" alignItems="center">
                    <Avatar id={profile.id} />
                    <Column gap="1">
                        <Text size={16} weight={600}>
                            {profile?.name}
                        </Text>
                        <Text size={10} weight={400} color="#303234A3">
                            {phone}
                        </Text>
                    </Column>
                </Row>
                <Icon name="chevronRight" />
            </Row>
        </Link>
    );
};

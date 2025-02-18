'use client';

import {Icon, IconName} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import Link from 'next/link';

type ProfileButtonProps = {
    onClick?: () => void;
    icon: IconName;
    title: string;
};

export const ProfileLinkButton = ({href, ...props}: {href: string} & ProfileButtonProps) => {
    return (
        <Link href={href}>
            <ProfileButton {...props} />
        </Link>
    );
};

export const ProfileButton = (props: ProfileButtonProps) => {
    return (
        <Row
            borderRadius="3"
            backgroundColor="#F5F5F5"
            paddingX="4"
            paddingY="3"
            justifyContent="space-between"
            alignItems="center"
            onClick={props.onClick}
        >
            <Row gap="2">
                <Icon name={props.icon} />
                <Text size={12} weight={500}>
                    {props.title}
                </Text>
            </Row>

            <Icon name="chevronRight" />
        </Row>
    );
};

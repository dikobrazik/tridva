'use client';

import {Icon, IconName} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Column} from '@/components/layout/Column';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export const FooterButton = ({
    icon,
    activeIcon,
    title,
    href,
}: {
    icon: IconName;
    activeIcon: IconName;
    title: string;
    href: string;
}) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const iconName = isActive ? activeIcon : icon;

    return (
        <Link href={href}>
            <Column gap={1} alignItems="center" paddingX={3}>
                <Icon name={iconName} size="m" />
                <Text color={isActive ? '#F40C43' : '#303234'}>{title}</Text>
            </Column>
        </Link>
    );
};

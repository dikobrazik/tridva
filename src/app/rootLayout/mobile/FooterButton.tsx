'use client';

import {Icon, IconName} from '@/components/Icon';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import css from './Footer.module.scss';

export const FooterButton = ({
    icon,
    activeIcon,
    title,
    href,
    strictActiveMatch,
    count,
}: {
    icon: IconName;
    activeIcon: IconName;
    title: string;
    href: string;
    strictActiveMatch?: boolean;
    count?: number;
}) => {
    const pathname = usePathname();
    const isActive = strictActiveMatch ? pathname === href : pathname.startsWith(href);
    const iconName = isActive ? activeIcon : icon;

    return (
        <Link href={href}>
            <Column position="relative" gap={1} alignItems="center" paddingX={3}>
                {count !== undefined && <Box className={css.footerButtonCount}>{count}</Box>}
                <Icon name={iconName} size="m" />
                <Text color={isActive ? '#F40C43' : '#303234'}>{title}</Text>
            </Column>
        </Link>
    );
};

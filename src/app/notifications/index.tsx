'use client';

import {Row} from '@/components/layout/Row';
import {Icon, IconName} from '@/components/Icon';
import {Text} from '@/components/Text';
import css from './Notification.module.scss';
import {Column} from '@/components/layout/Column';
import {useAppSelector} from '@/lib/hooks';
import {notificationsSelectors} from '@/lib/features/notifications';
import {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';

type NotificationProps = {
    icon?: IconName;
    text: string;
};

export const Notification = ({icon, text}: NotificationProps) => {
    const [className, setClassName] = useState(css.notification);

    useEffect(() => {
        setTimeout(() => {
            setClassName(classNames(css.notification, css.hide));
        }, 4500);
    }, []);

    return (
        <Row className={className} gap={2} paddingY={3} justifyContent="center">
            {icon && <Icon name={icon} />}

            <Text color="#fff" size={14} weight={500}>
                {text}
            </Text>
        </Row>
    );
};

export const NotificationsContainer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const notifications = useAppSelector(notificationsSelectors.selectAll);

    useEffect(() => {
        const listener = () => {
            if (containerRef.current) {
                const scrollY = window.scrollY;

                const translate = Math.max(-scrollY, -62);

                containerRef.current.style.transform = `translateY(${translate}px)`;
            }
        };

        document.addEventListener('scroll', listener);

        return () => {
            document.removeEventListener('scroll', listener);
        };
    }, []);

    return (
        <Column ref={containerRef} className={css.container} gap={2} paddingX={2}>
            {notifications.map(notification => (
                <Notification key={notification.id} {...notification} />
            ))}
        </Column>
    );
};

'use client';

import {PropsWithChildren, useRef} from 'react';
import css from './Footer.module.scss';
import {Column} from '@/components/layout/Column';
import {useScrollObserver} from '@/hooks/useScrollObserver';
import {usePathname} from 'next/navigation';

const PAGES_WITH_HIDDEN_FOOTER_RE = /^[/]((categories([/]\d+)?)|basket|offers[/]search)?$/;

export const FooterContainer = (props: PropsWithChildren) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const shouldHideFooterOnScroll = PAGES_WITH_HIDDEN_FOOTER_RE.test(pathname);

    useScrollObserver({
        onScrollDown: () => {
            if (shouldHideFooterOnScroll && !columnRef.current?.classList.contains(css.hide)) {
                columnRef.current?.classList.add(css.hide);
                columnRef.current?.classList.remove(css.show);
            }
        },
        onScrollUp: () => {
            if (shouldHideFooterOnScroll && !columnRef.current?.classList.contains(css.show)) {
                columnRef.current?.classList.add(css.show);
                columnRef.current?.classList.remove(css.hide);
            }
        },
    });

    return (
        <Column ref={columnRef} id="footer-container" className={css.footer} padding="8px 16px">
            {props.children}
        </Column>
    );
};

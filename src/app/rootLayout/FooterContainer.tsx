'use client';

import {PropsWithChildren, useRef} from 'react';
import css from './Footer.module.scss';
import {Column} from '@/components/layout/Column';
import {usePathname} from 'next/navigation';
import {useScrollObserver} from '@/hooks/useScrollObserver';

// const PAGES_WITH_HIDING_FOOTER_RE = /(\/)|(\/offers\/\d+)/;

export const FooterContainer = (props: PropsWithChildren) => {
    const pathname = usePathname();

    const columnRef = useRef<HTMLDivElement>(null);

    useScrollObserver({
        // isEnabled: PAGES_WITH_HIDING_FOOTER_RE.test(pathname),
        isEnabled: pathname === '/',
        onScrollDown: () => {
            if (!columnRef.current?.classList.contains(css.hide)) {
                columnRef.current?.classList.add(css.hide);
                columnRef.current?.classList.remove(css.show);
            }
        },
        onScrollUp: () => {
            if (!columnRef.current?.classList.contains(css.show)) {
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

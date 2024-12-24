'use client';

import {PropsWithChildren, useEffect} from 'react';
import {Row} from '../layout/Row';
import css from './Footer.module.scss';
import footerCss from '@/app/rootLayout/Footer.module.scss';
import cn from 'classnames';

export const Footer = (props: PropsWithChildren<{fixed?: boolean}>) => {
    useEffect(() => {
        const globalFooter = document.querySelector('#footer-container');

        if (globalFooter) {
            globalFooter.classList.add(footerCss.withoutShadow);
        }

        return () => {
            if (globalFooter) {
                globalFooter.classList.remove(footerCss.withoutShadow);
            }
        };
    }, []);

    return <Row className={cn(css.footer, {[css.fixed]: props.fixed})}>{props.children}</Row>;
};

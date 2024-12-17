import {PropsWithChildren} from 'react';
import {Row} from '../layout/Row';
import css from './Footer.module.scss';

export const Footer = (props: PropsWithChildren) => {
    return <Row className={css.footer}>{props.children}</Row>;
};

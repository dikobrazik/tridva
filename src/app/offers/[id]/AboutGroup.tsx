'use client';

import {Icon} from '@/components/Icon';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import classNames from 'classnames';
import css from './Page.module.scss';
import {useToggler} from '@/hooks/useToggler';
import {Modal} from '@/components/Modal';
import {Column} from '@/components/layout/Column';

export const AboutGroup = () => {
    const {toggle, isActive} = useToggler();
    return (
        <>
            <Row
                onClick={toggle}
                className={classNames(css.tab, css.greentab)}
                justifyContent="space-between"
                paddingX={2}
                paddingY={1}
            >
                <Row gap={2} alignItems="center">
                    <Icon name="crown" />
                    <Text weight="400" size={12} lineHeight={12}>
                        Гарантия сбора первой группы
                    </Text>
                </Row>
                <Icon name="helpGreen" />
            </Row>

            <Modal isOpen={isActive} onClose={toggle}>
                <Column gap={3} paddingX={4}>
                    <Text align="center" size={16} weight={600}>
                        Групповая покупка
                    </Text>

                    <Text size={12}>
                        Принцип организации покупки, который появился в середине 2000-х годов на стыке новых
                        возможностей интернет-коммуникаций по удалению избыточных посредников и неформальной системы
                        местных потребительских связей определённого города и региона. При совершении совместной покупки
                        несколько лиц приобретают товары непосредственно у поставщика или производителя по оптовым
                        ценам, независимо от страны его расположения. Такая покупка делается организатором нередко через
                        интернет-магазин или онлайн-аукцион.
                    </Text>
                </Column>
            </Modal>
        </>
    );
};

'use client';

import {Icon} from '@/components/Icon';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Modal} from '@/components/Modal';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';

export const AboutGroups = () => {
    const {isActive, toggle} = useToggler();
    return (
        <>
            <Row onClick={toggle} alignItems="center" gap={1}>
                <Text weight="400" size={10} lineHeight={12} color="#303234A6">
                    Как это работает
                </Text>
                <Icon name="help" />
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

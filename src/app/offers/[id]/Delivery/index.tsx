'use client';

import {Icon} from '@/components/Icon';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Modal} from '@/components/Modal';
import {Text} from '@/components/Text';
import {useToggler} from '@/hooks/useToggler';

export const AboutDelivery = () => {
    const {toggle, isActive} = useToggler();
    return (
        <>
            <Row
                onClick={toggle}
                border="1px solid #9ca3aa7a"
                borderRadius={3}
                justifyContent="space-between"
                paddingX={2}
                paddingY={1}
            >
                <Row alignItems="center" gap={1}>
                    <Icon name="delivery" />
                    <Text weight="400" size="10px" height={12}>
                        <Text color="#42C52D">17 ноября</Text>, бесплатная доставка до пункта выдачи
                    </Text>
                </Row>
                <Icon name="help" />
            </Row>

            <Modal isOpen={isActive} onClose={toggle}>
                <Column gap={3} paddingX={4}>
                    <Text align="center" size={16} weight={600}>
                        Доставка
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

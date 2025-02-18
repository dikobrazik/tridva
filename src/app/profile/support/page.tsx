import {Header} from '@/components/Header';
import {Column} from '@/components/layout/Column';
import css from './Support.module.scss';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import {Icon} from '@/components/Icon';
import {PropsWithChildren} from 'react';

type DetailProps = {
    title: string;
};

const Detail = (props: PropsWithChildren<DetailProps>) => {
    return (
        <details name="info">
            <summary>
                <Row alignItems="center" justifyContent="space-between">
                    <Text size={14} weight={500}>
                        {props.title}
                    </Text>
                    <Icon className={css.icon} size="m" name="chevronRight" />
                </Row>
            </summary>
            {props.children}
        </details>
    );
};

export default function SupportPage() {
    return (
        <Column>
            <Header withBackArrow>Справка</Header>
            <Column className={css.detailsList} padding="4px 16px 0" height="100vh" backgroundColor="#fff">
                {Array(10)
                    .fill(undefined)
                    .map((_, index) => (
                        <Detail key={index} title="Как сделать заказ">
                            Система быстрых платежей (далее &quot;СБП&quot;) - сервис платежной системы Банка России,
                            позволяющий физическим лицам производить оплату за товар/услуги с помощью любого
                            банка-участника СБП. Список банков-участников опубликован на официальном сайте
                            https://sbp.nspk.ru/participants/ Безопасность переводов обеспечивается на стороне всех
                            банков-участников СБП: банков, Банка России и НСПК с использованием современных систем
                            защиты. СБП соответствует всем стандартам информационной безопасности.
                        </Detail>
                    ))}
            </Column>
        </Column>
    );
}

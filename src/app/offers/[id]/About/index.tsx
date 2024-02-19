import css from './About.module.scss';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';

const data = {
    characteristics: [
        {
            name: 'Цвет товара',
            value: 'Черный',
        },
        {
            name: 'Принт',
            value: 'Повседневный, Принт/Логотип',
        },
    ],
    description:
        'Преимущества электрической звуковой зубной щетки Sonic Toothbrush X-3:- Удобнее. Для вашего удобства используйте зубную щетку Sonic Toothbrush X-3 обычной продолговатой формы',
};

type Props = {
    name?: string;
    value?: number;
};

function AboutItem(props: Props) {
    const {name, value} = props;

    return (
        <Row justifyContent="space-between" paddingY={2}>
            <Text weight="400" size="10px" height={12}>
                {name}
            </Text>
            <Text weight="400" size="10px" height={12}>
                {value}
            </Text>
        </Row>
    );
}

export default function About() {
    return (
        <Column className={css.about} paddingY={4} gap={3}>
            <Text weight="600" size="16px" height={20}>
                О товаре
            </Text>
            <ul className={css.aboutList}>
                <li>
                    <AboutItem name="" />
                </li>
                <li>
                    <Row justifyContent="space-between" paddingY={2}>
                        <Text weight="400" size="10px" height={12}>
                            Принт
                        </Text>
                        <Text weight="400" size="10px" height={12}>
                            Повседневный, Принт/Логотип
                        </Text>
                    </Row>
                </li>
                <li>
                    <Row justifyContent="space-between" paddingY={2}>
                        <Text weight="400" size="10px" height={12}>
                            Состав
                        </Text>
                        <Text weight="400" size="10px" height={12}>
                            хлопок 100%
                        </Text>
                    </Row>
                </li>
            </ul>
            <button className={css.btn}>
                <Text weight="500" size="12px" height={14} decoration="underline">
                    Все характеристики и описание
                </Text>
            </button>
        </Column>
    );
}

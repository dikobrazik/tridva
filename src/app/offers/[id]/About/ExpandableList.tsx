'use client';

import css from './About.module.scss';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {OfferAttribute} from '@/types/offers';
import {useState} from 'react';

type AboutItemProps = {
    name: string;
    value: string;
};

function AboutItem(props: AboutItemProps) {
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

export const ExpandableList = ({attributes}: {attributes: OfferAttribute[]}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <ul className={css.aboutList}>
                {attributes.slice(0, isExpanded ? undefined : 3).map(attribute => (
                    <li key={attribute.id}>
                        <AboutItem name={attribute.attributeName} value={attribute.value} />
                    </li>
                ))}
            </ul>
            <button onClick={() => setIsExpanded(value => !value)} className={css.btn}>
                <Text weight="500" size="12px" height={14} decoration="underline">
                    {isExpanded ? 'Скрыть в' : 'В'}се характеристики и описание
                </Text>
            </button>
        </>
    );
};

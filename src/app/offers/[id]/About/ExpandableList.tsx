'use client';

import {Button} from '@/components/Button';
import css from './About.module.scss';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {OfferAttribute} from '@/types/offers';
import {useToggler} from '@/hooks/useToggler';
import {Column} from '@/components/layout/Column';

type AboutItemProps = {
    name: string;
    value: string;
};

function AboutItem(props: AboutItemProps) {
    const {name, value} = props;

    return (
        <Row className={css.aboutItem} justifyContent="space-between">
            <Text weight="400" size="10px" height={12}>
                {name}
            </Text>
            <Text weight="400" size="10px" height={12}>
                {value}
            </Text>
        </Row>
    );
}

export const ExpandableList = ({attributes, description}: {attributes: OfferAttribute[]; description: string}) => {
    const {isActive: isExpanded, toggle} = useToggler();

    return (
        <>
            <Column gap={2}>
                {attributes.slice(0, isExpanded ? undefined : 3).map(attribute => (
                    <AboutItem key={attribute.id} name={attribute.attributeName} value={attribute.value} />
                ))}
            </Column>
            {attributes.length > 3 ? (
                <Button variant="pseudo" onClick={toggle}>
                    <Text weight={500} size={12} height={14} decoration="underline">
                        {isExpanded ? 'Скрыть в' : 'В'}се характеристики и описание
                    </Text>
                </Button>
            ) : null}
            <Text size={10} weight={400}>
                {description}
            </Text>
        </>
    );
};

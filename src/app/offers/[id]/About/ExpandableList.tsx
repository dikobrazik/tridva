'use client';

import {Button} from '@/components/Button';
import css from './About.module.scss';
import {Row} from '@/components/layout/Row';
import {Text} from '@/components/Text';
import {OfferAttribute} from '@/types/offers';
import {useToggler} from '@/hooks/useToggler';
import {Column} from '@/components/layout/Column';
import {Box} from '@/components/layout/Box';

type AboutItemProps = {
    name: string;
    value: string;
};

function AboutItem(props: AboutItemProps) {
    const {name, value} = props;

    return (
        <Row gap={1} justifyContent="space-between">
            <Text whiteSpace="nowrap" weight="400" size="10px" lineHeight={12}>
                {name}
            </Text>
            <Box flex="1" className={css.underline}></Box>
            <Text weight="400" size="10px" lineHeight={12}>
                {value}
            </Text>
        </Row>
    );
}

export const ExpandableList = ({attributes}: {attributes: OfferAttribute[]}) => {
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
                    <Text weight={500} size={12} lineHeight={14} decoration="underline">
                        {isExpanded ? 'Скрыть в' : 'В'}се характеристики и описание
                    </Text>
                </Button>
            ) : null}
        </>
    );
};

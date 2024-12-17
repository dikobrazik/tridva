'use client';

import {PropsWithChildren, ReactNode} from 'react';
import {Row} from '../layout/Row';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {useRouter} from 'next/navigation';
import {Box} from '../layout/Box';

type Props = PropsWithChildren<{
    left?: ReactNode;
    right?: ReactNode;
    withBackArrow?: boolean;
}>;

export const Header = (props: Props) => {
    const router = useRouter();

    const {left, right, children, withBackArrow} = props;

    const leftDefaultComponent = withBackArrow ? (
        <Box onClick={() => router.back()}>
            <Icon size="m" name="chevronLeft" />
        </Box>
    ) : (
        <span />
    );

    return (
        <Row maxHeight="56px" background="#fff" padding="16px" justifyContent="space-between" alignItems="center">
            {left ? left : leftDefaultComponent}
            <Text size={16} weight={600}>
                {children}
            </Text>
            {right ? right : <span />}
        </Row>
    );
};

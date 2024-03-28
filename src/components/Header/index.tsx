import {PropsWithChildren, ReactNode} from 'react';
import {Row} from '../layout/Row';
import {Text} from '../Text';
import Link from 'next/link';
import {Icon} from '../Icon';

type Props = PropsWithChildren<{
    left?: ReactNode;
    right?: ReactNode;
    withBackArrow?: boolean;
}>;

export const Header = (props: Props) => {
    const {left, right, children, withBackArrow} = props;

    const leftDefaultComponent = withBackArrow ? (
        <Link href="..">
            <Icon size="m" name="chevronLeft" />
        </Link>
    ) : (
        <span />
    );

    return (
        <Row background="#fff" padding="16px" justifyContent="space-between">
            {left ? left : leftDefaultComponent}
            <Text size={16} weight={600}>
                {children}
            </Text>
            {right ? right : <span />}
        </Row>
    );
};

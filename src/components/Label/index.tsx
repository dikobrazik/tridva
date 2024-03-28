import {PropsWithChildren, ReactNode} from 'react';
import {Column} from '../layout/Column';
import {Text} from '../Text';

type Props = PropsWithChildren<{text: ReactNode}>;

export const Label = (props: Props) => {
    return (
        <Column gap="1">
            <Text size={10} weight={400} color="#303234A3">
                {props.text}
            </Text>
            {props.children}
        </Column>
    );
};

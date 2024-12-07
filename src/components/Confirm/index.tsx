'use client';

import {useToggler} from '@/hooks/useToggler';
import {Modal} from '../Modal';
import {Button} from '../Button';
import {ReactNode} from 'react';
import {Text} from '../Text';
import {Column} from '../layout/Column';
import {Drawer} from '../Drawer';

type Props = {
    title: string;
    description?: string;

    component?: 'Drawer' | 'Modal';

    onAcceptClick: () => void;

    acceptButtonText: string;
    cancelButtonText?: string;

    renderButton: (props: {onClick: () => void}) => ReactNode;
};

export const Confirm = (props: Props) => {
    const {
        title,
        description,
        component = 'Drawer',
        onAcceptClick,
        acceptButtonText,
        cancelButtonText,
        renderButton,
    } = props;
    const {isActive, toggleOff, toggleOn} = useToggler();

    const Component = component === 'Drawer' ? Drawer : Modal;

    return (
        <>
            {renderButton({onClick: toggleOn})}
            <Component isOpen={isActive} onClose={toggleOff}>
                <Column gap={10}>
                    <Column gap={4}>
                        <Text weight={600} size={16}>
                            {title}
                        </Text>
                        <Text size={14} weight={400} whiteSpace="pre-wrap">
                            {description}
                        </Text>
                    </Column>

                    <Column gap={2}>
                        <Button
                            variant="normal"
                            onClick={() => {
                                toggleOff();
                                onAcceptClick();
                            }}
                        >
                            {acceptButtonText}
                        </Button>

                        {cancelButtonText && <Button onClick={toggleOff}>{cancelButtonText}</Button>}
                    </Column>
                </Column>
            </Component>
        </>
    );
};

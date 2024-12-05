'use client';

import {useToggler} from '@/hooks/useToggler';
import {Modal} from '../Modal';
import {Button} from '../Button';
import {ReactNode} from 'react';
import {Text} from '../Text';
import {Column} from '../layout/Column';

type Props = {
    title: string;
    description?: string;

    onAcceptClick: () => void;

    acceptButtonText: string;
    cancelButtonText: string;

    renderButton: (props: {onClick: () => void}) => ReactNode;
};

export const Confirm = (props: Props) => {
    const {title, description, onAcceptClick, acceptButtonText, cancelButtonText, renderButton} = props;
    const {isActive, toggleOff, toggleOn} = useToggler();

    return (
        <>
            {renderButton({onClick: toggleOn})}
            <Modal isOpen={isActive} onClose={toggleOff}>
                <Column gap={10}>
                    <Text weight={600} size={16} align="center">
                        {title}
                    </Text>
                    {description}

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

                        <Button onClick={toggleOff}>{cancelButtonText}</Button>
                    </Column>
                </Column>
            </Modal>
        </>
    );
};

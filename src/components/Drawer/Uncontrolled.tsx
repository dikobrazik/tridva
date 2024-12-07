import {useToggler} from '@/hooks/useToggler';
import {PropsWithChildren, ReactNode} from 'react';
import {Drawer} from '.';

export const UncontrolledDrawer = ({
    renderTrigger,
    children,
}: PropsWithChildren<{renderTrigger: (props: {onClick: () => void}) => ReactNode}>) => {
    const {isActive, toggleOff, toggleOn} = useToggler();

    return (
        <>
            {renderTrigger({onClick: toggleOn})}
            <Drawer isOpen={isActive} onClose={toggleOff}>
                {children}
            </Drawer>
        </>
    );
};

import {AnimationEventHandler, useEffect, useState} from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;

    closeAnimationClassName: string;
    openClassName: string;
    closedClassName: string;
};

export const useAnimatedPopover = (props: Props) => {
    const {onClose, isOpen, closeAnimationClassName, openClassName, closedClassName} = props;

    const [classNames, setClassNames] = useState<Record<string, boolean>>({});

    const onAnimationEnd: AnimationEventHandler<HTMLDivElement> = e => {
        if (e.animationName === closeAnimationClassName) {
            onClose();
            setClassNames({});
        }
    };

    const onCloseClick = () => {
        setClassNames({[closedClassName]: true});
    };

    useEffect(() => {
        if (isOpen) {
            setClassNames({[openClassName]: isOpen});
        }
    }, [isOpen]);

    return {classNames, onClose: onCloseClick, onAnimationEnd};
};

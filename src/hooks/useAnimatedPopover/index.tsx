import {AnimationEventHandler, useEffect, useRef, useState} from 'react';

type Props = {
    isOpen: boolean;

    closeAnimationClassName: string;
    openClassName: string;
    closedClassName: string;
};

const usePrevValue = <T,>(value: T) => {
    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    return valueRef.current;
};

export const useAnimatedPopover = (props: Props) => {
    const {isOpen, closeAnimationClassName, openClassName, closedClassName} = props;

    const prevIsOpen = usePrevValue(isOpen);

    const [classNames, setClassNames] = useState<Record<string, boolean>>({});

    const onAnimationEnd: AnimationEventHandler<HTMLDivElement> = e => {
        if (e.animationName === closeAnimationClassName) {
            setClassNames({});
        }
    };

    useEffect(() => {
        if (!prevIsOpen && isOpen) {
            setClassNames({[openClassName]: true});
        }

        if (prevIsOpen && !isOpen) {
            setClassNames({[closedClassName]: true});
        }
    }, [isOpen]);

    return {classNames, onAnimationEnd};
};

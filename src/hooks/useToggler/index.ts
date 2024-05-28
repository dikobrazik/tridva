import {useCallback, useState} from 'react';

export const useToggler = (initialValue: boolean = false) => {
    const [isActive, setIsActive] = useState(initialValue);

    const toggle = useCallback(() => {
        setIsActive(active => !active);
    }, []);

    const toggleOn = useCallback(() => {
        setIsActive(true);
    }, []);

    const toggleOff = useCallback(() => {
        setIsActive(false);
    }, []);

    return {
        isActive,
        toggle,
        toggleOn,
        toggleOff,
    };
};

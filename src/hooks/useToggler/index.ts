import {useCallback, useState} from 'react';

export const useToggler = (initialValue: boolean = false) => {
    const [isActive, setIsActive] = useState(initialValue);

    const toggle = useCallback(() => {
        setIsActive(active => !active);
    }, []);

    return {
        isActive,
        toggle,
    };
};

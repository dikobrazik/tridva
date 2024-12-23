import {useRef, useEffect, useState, PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';

type Props = {
    selector?: string;
};

export const Portal = ({children, selector}: PropsWithChildren<Props>) => {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = selector ? document.querySelector(selector) : document.body;
        setMounted(true);
    }, [selector]);

    return mounted && ref.current !== null ? createPortal(children, ref.current) : null;
};

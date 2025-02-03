'use client';

import {MouseEventHandler, PropsWithChildren, useCallback} from 'react';
import cn from 'classnames';
import css from './Modal.module.scss';
import {Icon} from '../Icon';
import {Portal} from '../Portal';
import {useAnimatedPopover} from '@/hooks/useAnimatedPopover';

type Props = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
}>;

export const Modal = (props: Props) => {
    const {children, onClose} = props;
    const {classNames, onAnimationEnd} = useAnimatedPopover({
        isOpen: props.isOpen,
        closeAnimationClassName: css['fade-out'],
        openClassName: css.open,
        closedClassName: css.closed,
    });

    const onWrapperClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    return (
        <Portal>
            <div className={cn(css.wrapper, classNames)} onClick={onWrapperClick} onAnimationEnd={onAnimationEnd}>
                <div className={cn(css.content)}>
                    <div className={css.closeIcon}>
                        <Icon size="m" onClick={onClose} name="close" />
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

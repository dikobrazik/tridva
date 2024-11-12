import {MouseEventHandler, PropsWithChildren, useCallback, useEffect} from 'react';
import cn from 'classnames';
import css from './Drawer.module.scss';
import {Icon} from '../Icon';
import classNames from 'classnames';
import {createPortal} from 'react-dom';
import {usePageScrollable} from '@/hooks/usePageScrollable';

type Props = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;

    withoutBlackout?: boolean;
}>;

export const Drawer = (props: Props) => {
    const {onClose, isOpen, withoutBlackout, children} = props;
    const onWrapperClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    const {turnOffScroll, turnOnScroll} = usePageScrollable();

    useEffect(() => {
        if (isOpen) turnOffScroll();
        else turnOnScroll();

        return turnOnScroll;
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div
            className={classNames(css.wrapper, {[css.blackout]: !withoutBlackout})}
            onClick={withoutBlackout ? undefined : onWrapperClick}
        >
            <div className={cn(css.content, {[css.withLine]: false})}>
                <div className={css.closeIcon}>
                    <Icon size="m" onClick={onClose} name="close" />
                </div>
                {children}
            </div>
        </div>,
        document.body,
    );
};

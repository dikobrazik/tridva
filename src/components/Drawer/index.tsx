import {useAnimatedPopover} from '@/hooks/useAnimatedPopover';
import {usePageScrollable} from '@/hooks/usePageScrollable';
import cn from 'classnames';
import {MouseEventHandler, PropsWithChildren, useCallback, useEffect} from 'react';
import {Icon} from '../Icon';
import {Portal} from '../Portal';
import css from './Drawer.module.scss';

type Props = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;

    withoutBlackout?: boolean;
}>;

export const Drawer = (props: Props) => {
    const {isOpen, onClose, withoutBlackout, children} = props;

    const {classNames, onAnimationEnd} = useAnimatedPopover({
        isOpen: props.isOpen,
        closeAnimationClassName: css['slide-bottom'],
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

    const {turnOffScroll, turnOnScroll} = usePageScrollable();

    useEffect(() => {
        if (isOpen) turnOffScroll();
        else turnOnScroll();

        return turnOnScroll;
    }, [isOpen]);

    return (
        <Portal>
            <div
                className={cn(css.wrapper, {[css.blackout]: !withoutBlackout}, classNames)}
                onClick={withoutBlackout ? undefined : onWrapperClick}
            >
                <div className={cn(css.content, {[css.withLine]: false})} onAnimationEnd={onAnimationEnd}>
                    <div className={css.closeIcon}>
                        <Icon size="m" onClick={onClose} name="close" />
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

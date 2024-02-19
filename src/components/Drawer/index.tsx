import {MouseEventHandler, PropsWithChildren, useCallback} from 'react';
import cn from 'classnames';
import css from './Drawer.module.scss';
import {Icon} from '../Icon';

type Props = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;

    header?: React.ReactNode;

    fullHeight?: boolean;
    withClose?: boolean;
    withLine?: boolean;
}>;

export const Drawer = (props: Props) => {
    const {onClose, isOpen, fullHeight, withLine = true, withClose, header, children} = props;
    const onWrapperClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    if (!isOpen) {
        return null;
    }

    return (
        <div className={css.wrapper} onClick={onWrapperClick}>
            <div className={cn(css.content, {[css.fullHeight]: fullHeight, [css.withLine]: withLine && !fullHeight})}>
                <div className={css.header}>{header}</div>
                {withClose && (
                    <div className={css.closeIcon}>
                        <Icon size="m" onClick={onClose} name="close" />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

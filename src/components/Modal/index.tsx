import {MouseEventHandler, PropsWithChildren, useCallback} from 'react';
import cn from 'classnames';
import css from './Modal.module.scss';
import {Icon} from '../Icon';
import {createPortal} from 'react-dom';

type Props = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
}>;

export const Modal = (props: Props) => {
    const {onClose, isOpen, children} = props;
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

    return createPortal(
        <div className={css.wrapper} onClick={onWrapperClick}>
            <div className={cn(css.content)}>
                <div className={css.closeIcon}>
                    <Icon size="m" onClick={onClose} name="close" />
                </div>
                {children}
            </div>
        </div>,
        document.body,
    );
};

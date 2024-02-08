import {MouseEventHandler, PropsWithChildren, useCallback} from 'react';
import css from './Drawer.module.scss';

type Props = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
}>;

export const Drawer = (props: Props) => {
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

    return (
        <div className={css.wrapper} onClick={onWrapperClick}>
            <div className={css.content}>{children}</div>
        </div>
    );
};

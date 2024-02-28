import cn from 'classnames';
import {UnitProps} from '../types';
import css from './Block.module.scss';
import {Column} from '../Column';

type BlockProps = Omit<UnitProps<'div'>, 'as'>;

export const Block = ({children, ...boxProps}: BlockProps) => {
    return (
        <Column {...boxProps} className={cn(css.block, boxProps.className)}>
            {children}
        </Column>
    );
};

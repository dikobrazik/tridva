'use client';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import css from './Search.module.scss';
import {Button} from '@/components/Button';

export const Search = () => {
    const {isActive, toggle} = useToggler();

    return (
        <>
            <TextField icon="search" onFocus={toggle} onBlur={toggle} />
            {isActive && (
                <Column className={css.layover} justifyContent="space-between">
                    <Column></Column>
                    <Button>Найти</Button>
                </Column>
            )}
        </>
    );
};

'use client';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import css from './Search.module.scss';
import {Button} from '@/components/Button';
import {useCallback, useState} from 'react';
import {searchOffersAction} from '@/lib/features/offers';
import {useAppDispatch} from '@/lib/hooks';

export const Search = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const {isActive, toggle} = useToggler();

    const onSearchClick = useCallback(() => {
        toggle();
        // dispatch(searchOffersAction({search}));
    }, [search]);

    return (
        <>
            <TextField icon="search" value={search} onChange={e => setSearch(e.target.value)} onFocus={toggle} />
            {isActive && (
                <Column className={css.layover} justifyContent="space-between">
                    <Column></Column>
                    <Button variant="normal" onClick={onSearchClick}>
                        Найти
                    </Button>
                </Column>
            )}
        </>
    );
};

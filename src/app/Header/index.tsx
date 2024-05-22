'use client';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import css from './Search.module.scss';
import {Button} from '@/components/Button';
import {useCallback, useState} from 'react';
import {useAppDispatch} from '@/lib/hooks';
import {Logo} from '@/components/Logo';
import Link from 'next/link';
import {Row} from '@/components/layout/Row';
import {usePathname} from 'next/navigation';

const pagesWithoutHeader = [/[/]offers[/]\d+[/]reviews/, /[/]basket/, /[/]profile[/]edit/, /[/]profile[/]orders/];

export const Header = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const {isActive, toggle} = useToggler();

    const onSearchClick = useCallback(() => {
        toggle();
        // dispatch(searchOffersAction({search}));
    }, [search]);

    if (pagesWithoutHeader.find(pageRe => pageRe.test(pathname))) return;

    return (
        <>
            <Row alignItems="center" gap="2" paddingX={4} paddingY={4}>
                <Link href="/">
                    <Logo />
                </Link>
                <TextField
                    placeholder="Искать товары и категории"
                    icon="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={toggle}
                />
                {isActive && (
                    <Column className={css.layover} justifyContent="space-between">
                        <Column></Column>
                        <Button variant="normal" onClick={onSearchClick}>
                            Найти
                        </Button>
                    </Column>
                )}
            </Row>
        </>
    );
};

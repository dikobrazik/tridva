'use client';

import {Button} from '@/components/Button';
import {Icon} from '@/components/Icon';
import {Loader} from '@/components/Loader';
import {Logo} from '@/components/Logo';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {useSearch, SEARCH_PARAM_NAME} from '../hooks/useSearch';
import css from './Header.module.scss';

const pagesWithoutHeader = [
    /[/]offers[/]\d+[/]reviews/,
    /[/]basket/,
    /[/]profile[/]edit/,
    /[/]profile[/]orders/,
    /[/]profile[/]favorites/,
    /[/]profile[/]groups/,
    /[/]profile[/]orders-history/,
    /[/]basket[/]checkout[/]pickup-points/,
];

export const Header = () => {
    const pathname = usePathname();

    const {
        isActive,
        isLoading,
        search,
        setSearch,
        foundCategories,
        onSubmit,
        onInputChange,
        onInputFocus,
        onIconClick,
        resetSearchState,
    } = useSearch();

    useEffect(() => {
        if (!/[/]search/.test(pathname)) {
            setSearch('');
        }
    }, [pathname]);

    if (pagesWithoutHeader.find(pageRe => pageRe.test(pathname))) return;

    return (
        <>
            <Row className={css.container} backgroundColor="#fff" alignItems="center" gap="2" paddingX={4} paddingY={4}>
                {!isActive && (
                    <Link href="/">
                        <Logo />
                    </Link>
                )}
                <Box flex="1" as="form" onSubmit={onSubmit}>
                    <TextField
                        name="search"
                        placeholder="Искать товары и категории"
                        icon={search ? 'close' : 'search'}
                        value={search}
                        onChange={onInputChange}
                        onFocus={onInputFocus}
                        onIconClick={onIconClick}
                    />
                    <input type="submit" hidden tabIndex={-1} />
                </Box>
                {isActive && (
                    <Button variant="pseudo" onClick={resetSearchState(true)}>
                        <Text weight={500} size={12}>
                            Отменить
                        </Text>
                    </Button>
                )}
                {isActive &&
                    createPortal(
                        <Column paddingX={4} gap={3} className={css.layover} justifyContent="space-between">
                            <Column height="100%" overflowY="scroll" gap={3}>
                                <Column>
                                    {search && (
                                        <Link
                                            className={css.foundItem}
                                            key="search"
                                            href={`/offers/search?${SEARCH_PARAM_NAME}=${search}`}
                                            onClick={resetSearchState(false)}
                                        >
                                            <Row justifyContent="flex-start" paddingY={3} gap="3">
                                                <Icon name="search" size="s" />
                                                <Text weight={500} size={14}>
                                                    {search}
                                                </Text>
                                            </Row>
                                        </Link>
                                    )}
                                </Column>

                                {isLoading && (
                                    <Row paddingY={3} justifyContent="center">
                                        <Loader />
                                    </Row>
                                )}
                                {foundCategories.length > 0 && (
                                    <Column>
                                        <Text weight={400} size={10} color="#303234A3">
                                            Категории
                                        </Text>

                                        {foundCategories.map(category => (
                                            <Link
                                                className={css.foundItem}
                                                key={category.id}
                                                href={`/categories/${category.id}`}
                                                onClick={resetSearchState(true)}
                                            >
                                                <Row justifyContent="space-between" paddingY={3}>
                                                    <Text weight={500} size={14}>
                                                        {category.name}
                                                    </Text>
                                                    <Icon name="chevronRight" size="m" />
                                                </Row>
                                            </Link>
                                        ))}
                                    </Column>
                                )}
                            </Column>
                        </Column>,
                        document.body,
                    )}
            </Row>
        </>
    );
};

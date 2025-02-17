'use client';

import {Button} from '@/components/Button';
import {Box} from '@/components/layout/Box';
import {Text} from '@/components/Text';
import {TextField} from '@/components/TextField';
import css from './Search.module.scss';
import cn from 'classnames';
import {useSearch, SEARCH_PARAM_NAME} from '../hooks/useSearch';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import {Loader} from '@/components/Loader';
import {Icon} from '@/components/Icon';
import Link from 'next/link';
import {createPortal} from 'react-dom';

export const Search = () => {
    const {
        isActive,
        isLoading,
        search,
        foundCategories,
        onSubmit,
        onInputChange,
        onInputFocus,
        onIconClick,
        resetSearchState,
    } = useSearch();

    const isDropdownOpen = isActive && search;

    return (
        <>
            <Box className={css.searchContainer} position="relative" as="form" width="100%" onSubmit={onSubmit}>
                <TextField
                    className={cn(css.textField, css.custom)}
                    variant="red"
                    placeholder="Искать товары и категории"
                    value={search}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                />
                <Row className={css.controls}>
                    {Boolean(search) && (
                        <Button onClick={onIconClick} icon="close" iconSize="m" variant="pseudo" paddingX={2} />
                    )}
                    <Button size="m" type="submit">
                        <Box paddingX={5}>
                            <Text size={14} weight={400}>
                                Найти
                            </Text>
                        </Box>
                    </Button>
                </Row>
                {isDropdownOpen && (
                    <Column
                        padding="16px"
                        gap={3}
                        className={css.layover}
                        onClick={e => {
                            if (e.target === e.currentTarget) {
                                resetSearchState(false);
                            }
                        }}
                        justifyContent="space-between"
                    >
                        <Column height="100%" overflowY="scroll" gap={3}>
                            <Column>
                                {search && (
                                    <Link
                                        className={css.foundItem}
                                        key="search"
                                        href={`/offers/search?${SEARCH_PARAM_NAME}=${search}`}
                                        onClick={resetSearchState(false)}
                                    >
                                        <Row justifyContent="flex-start" paddingX={4} paddingY={3} gap="3">
                                            <Icon name="search" size="s" />
                                            <Text weight={400} size={14}>
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
                                <Column gap={3}>
                                    <Box paddingX={4}>
                                        <Text weight={400} size={14} color="#303234A3">
                                            Категории
                                        </Text>
                                    </Box>

                                    <Column gap={2}>
                                        {foundCategories.map(category => (
                                            <Link
                                                className={css.foundItem}
                                                key={category.id}
                                                href={`/categories/${category.id}`}
                                                onClick={resetSearchState(true)}
                                            >
                                                <Row justifyContent="space-between" paddingX={4} paddingY={2}>
                                                    <Text weight={400} size={14}>
                                                        {category.name}
                                                    </Text>
                                                    <Icon name="chevronRight" size="m" />
                                                </Row>
                                            </Link>
                                        ))}
                                    </Column>
                                </Column>
                            )}
                        </Column>
                    </Column>
                )}

                {isDropdownOpen && createPortal(<div className={css.blackout}></div>, document.body)}
            </Box>
        </>
    );
};

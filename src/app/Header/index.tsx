'use client';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import css from './Search.module.scss';
import {Button} from '@/components/Button';
import {useState} from 'react';
import {Logo} from '@/components/Logo';
import Link from 'next/link';
import {Row} from '@/components/layout/Row';
import {usePathname, useSearchParams} from 'next/navigation';
import {Text} from '@/components/Text';
import {Icon} from '@/components/Icon';
import {useDebounce} from '@/hooks/useDebounce';
import {loadCategoriesByName} from '@/api';
import {Category} from '@/types/category';
import {Loader} from '@/components/Loader';

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

const SEARCH_PARAM_NAME = 'name';

export const Header = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [foundCategories, setFoundCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState(searchParams.get(SEARCH_PARAM_NAME) ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const {isActive, toggle, toggleOn} = useToggler();

    const searchDebounced = useDebounce(() => {
        setIsLoading(true);
        setFoundCategories([]);
        loadCategoriesByName({name: search})
            .then(categories => setFoundCategories(categories))
            .finally(() => setIsLoading(false));
    }, 1000);

    const resetSearchState = (clearInput?: boolean) => () => {
        if (clearInput) {
            setSearch('');
        }
        toggle();
        setFoundCategories([]);
    };

    const onIconClick = () => {
        if (search) {
            setSearch('');
        }
    };

    const onInputChange = (value: string) => {
        setSearch(value);
        if (value) {
            searchDebounced();
        }
    };

    if (pagesWithoutHeader.find(pageRe => pageRe.test(pathname))) return;

    return (
        <>
            <Row backgroundColor="#fff" alignItems="center" gap="2" paddingX={4} paddingY={4}>
                {!isActive && (
                    <Link href="/">
                        <Logo />
                    </Link>
                )}
                <TextField
                    placeholder="Искать товары и категории"
                    icon={search ? 'close' : 'search'}
                    value={search}
                    onChange={onInputChange}
                    onFocus={toggleOn}
                    onIconClick={onIconClick}
                />
                {isActive && (
                    <Button variant="pseudo" onClick={resetSearchState(true)}>
                        <Text weight={500} size={12}>
                            Отменить
                        </Text>
                    </Button>
                )}
                {isActive && (
                    <Column padding="16px" gap={3} className={css.layover} justifyContent="space-between">
                        <Column height="100%" overflowY="scroll">
                            {search && (
                                <Link
                                    className={css.foundItem}
                                    key="search"
                                    href={`/search?${SEARCH_PARAM_NAME}=${search}`}
                                    onClick={resetSearchState(false)}
                                >
                                    <Row justifyContent="space-between" paddingY={3}>
                                        <Text weight={500} size={14}>
                                            {search}
                                        </Text>
                                        <Icon name="search" size="m" />
                                    </Row>
                                </Link>
                            )}
                            {isLoading && (
                                <Row paddingY={3} justifyContent="center">
                                    <Loader />
                                </Row>
                            )}
                            {foundCategories.map(category => (
                                <>
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
                                </>
                            ))}
                        </Column>
                    </Column>
                )}
            </Row>
        </>
    );
};

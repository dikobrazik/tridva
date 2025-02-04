import {loadCategoriesByName} from '@/api';
import {useDebounce} from '@/hooks/useDebounce';
import {usePageScrollable} from '@/hooks/usePageScrollable';
import {useToggler} from '@/hooks/useToggler';
import {Category} from '@/types/category';
import {useSearchParams, useRouter} from 'next/navigation';
import {FormEventHandler, useState} from 'react';

export const SEARCH_PARAM_NAME = 'search';

export const useSearch = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [foundCategories, setFoundCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState(searchParams.get(SEARCH_PARAM_NAME) ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const {isActive, toggleOn, toggleOff} = useToggler();

    const {turnOnScroll, turnOffScroll} = usePageScrollable();

    const searchDebounced = useDebounce((value: string) => {
        setFoundCategories([]);
        if (value) {
            setIsLoading(true);
            loadCategoriesByName({name: value})
                .then(categories => setFoundCategories(categories))
                .finally(() => setIsLoading(false));
        }
    }, 1000);

    const resetSearchState = (clearInput?: boolean) => () => {
        if (clearInput) {
            setSearch('');
        }
        toggleOff();
        turnOnScroll();
        setFoundCategories([]);
    };

    const onIconClick = () => {
        if (search) {
            setSearch('');
        }
    };

    const onInputChange = (value: string) => {
        setSearch(value);
        searchDebounced(value);
    };

    const onInputFocus = () => {
        toggleOn();

        turnOffScroll();
    };

    const onInputBlur = () => {
        toggleOff();

        turnOnScroll();
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        // почему то resetSearchState не работает, поэтому закостылил след 2 строки
        toggleOff();
        turnOnScroll();
        (e.currentTarget.querySelector('input[name="search"]') as HTMLInputElement).blur();
        resetSearchState(false);
        router.push(`/offers/search?${SEARCH_PARAM_NAME}=${search}`);
    };

    return {
        isActive,
        isLoading,
        search,
        setSearch,
        foundCategories,
        onSubmit,
        onInputFocus,
        onInputBlur,
        onInputChange,
        onIconClick,
        resetSearchState,
    };
};

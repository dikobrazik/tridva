'use client';
import {TextField} from '@/components/TextField';
import {Column} from '@/components/layout/Column';
import {useToggler} from '@/hooks/useToggler';
import css from './Search.module.scss';
import {Button} from '@/components/Button';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {Logo} from '@/components/Logo';
import Link from 'next/link';
import {Row} from '@/components/layout/Row';
import {usePathname} from 'next/navigation';
import {Text} from '@/components/Text';
import {offersActions, offersSelectors, searchOffersAction} from '@/lib/features/offers';
import {Icon} from '@/components/Icon';
import {useDebounce} from '@/hooks/useDebounce';

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
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const {isActive, toggle, toggleOn} = useToggler();

    const foundOffers = useAppSelector(offersSelectors.selectFoundOffers);

    const searchDebounced = useDebounce(() => {
        dispatch(searchOffersAction({search}));
    }, 500);

    const onCancelClick = () => {
        toggle();
        setSearch('');
        dispatch(offersActions.resetFoundOffersId());
    };

    const onIconClick = () => {
        if (search) {
            setSearch('');
        }
    };

    const onInputChange = (value: string) => {
        setSearch(value);
        searchDebounced();
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
                    <Button variant="pseudo" onClick={onCancelClick}>
                        <Text weight={500} size={12}>
                            Отменить
                        </Text>
                    </Button>
                )}
                {isActive && (
                    <Column padding="16px" gap={3} className={css.layover} justifyContent="space-between">
                        <Column height="100%" overflowY="scroll">
                            {foundOffers.map(offer => (
                                <>
                                    <Link
                                        className={css.foundItem}
                                        key={offer.id}
                                        href={`/offers/${offer.id}`}
                                        onClick={toggle}
                                    >
                                        <Row justifyContent="space-between" paddingY={3}>
                                            <Text weight={500} size={14}>
                                                {offer.title}
                                            </Text>
                                            <Icon name="chevronRight" size="m" />
                                        </Row>
                                    </Link>
                                </>
                            ))}
                        </Column>
                        {/* <Button onClick={onSearchClick}>Найти</Button> */}
                    </Column>
                )}
            </Row>
        </>
    );
};

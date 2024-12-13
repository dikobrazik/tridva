import {loadPopularCategories} from '@/api';
import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import classNames from 'classnames';
import Link from 'next/link';
import css from './PopularCategories.module.scss';

type Props = {
    categoryId?: number;
};

export const PopularCategories = async (props: Props) => {
    const popularCategories = await loadPopularCategories();

    return (
        <Row gap={2} overflowX="auto" paddingBottom="8px">
            {popularCategories.map(category => (
                <Link key={category.id} href={`/categories/${category.id}?popular=true`}>
                    <h2>
                        <Button
                            className={classNames(css.button, {
                                [css.active]: props.categoryId === category.id,
                            })}
                            style={{whiteSpace: 'nowrap'}}
                            size="m"
                            variant="normal"
                        >
                            <Text whiteSpace="nowrap" size={12}>
                                {category.name}
                            </Text>
                        </Button>
                    </h2>
                </Link>
            ))}
        </Row>
    );
};

import {loadPopularCategories} from '@/api';
import {Button} from '@/components/Button';
import {Text} from '@/components/Text';
import {Row} from '@/components/layout/Row';
import Link from 'next/link';

export const PopularCategories = async () => {
    const popularCategories = await loadPopularCategories();

    return (
        <Row gap={2} overflowX="auto" paddingBottom="8px">
            {popularCategories.map(category => (
                <Link key={category.id} href={`/categories/${category.id}?popular=true`}>
                    <h2>
                        <Button
                            style={{whiteSpace: 'nowrap'}}
                            size="m"
                            variant="normal"
                            backgroundColor="#f5f5f5"
                            border="1px solid #E1A6B414"
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

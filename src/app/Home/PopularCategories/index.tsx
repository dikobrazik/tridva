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
                <Link key={category.id} href={`/categories/${category.id}`}>
                    <Button size="m" variant="normal">
                        <Text wrap="nowrap" size={12}>
                            {category.name}
                        </Text>
                    </Button>
                </Link>
            ))}
        </Row>
    );
};

import {OfferCard} from '@/components/OfferCard';
import {Text} from '@/components/Text';
import {Box} from '@/components/layout/Box';
import InformationRow from './Home/InformationRow';
import {OffersList, OffersListContainer, OffersListLoader} from './OffersList';
import {loadOffers} from '@/api';
import {Block} from '@/components/layout/Block';
import {PopularCategories} from './Home/PopularCategories';
import {Column} from '@/components/layout/Column';
import {DEFAUL_PAGE_SIZE} from '@/shared/constants';
import {PageParams} from '@/shared/types/next';
import {isMobileDevice} from './utils/isMobileDevice';
import {Row} from '@/components/layout/Row';
import {Button} from '@/components/Button';
import Image from 'next/image';
import bannerImage from './optimize.webp';
import css from './Page.module.scss';

type Props = PageParams<{p: string}>;

export default async function Home(params: Props) {
    const page = params.searchParams.p;

    const {offers} = await loadOffers({pageSize: page ? Number(page) * DEFAUL_PAGE_SIZE : undefined});

    const isMobile = isMobileDevice();

    if (isMobile) {
        return (
            <Column gap="2" id="offers-list-container">
                <Block paddingTop="0">
                    <PopularCategories />

                    <InformationRow />
                </Block>

                <Block>
                    <Box paddingBottom="16px">
                        <Text weight={600} size={20}>
                            Рекомендации для вас
                        </Text>
                    </Box>

                    <OffersListContainer>
                        {offers.map((offer, index) => (
                            <OfferCard key={`${offer.id}`} {...offer} priority={index < 4} />
                        ))}
                        <OffersList />
                    </OffersListContainer>

                    <OffersListLoader />
                </Block>
            </Column>
        );
    }

    return (
        <Column gap="6" className={css.container}>
            <div></div>

            <Box className={css.bannerContainer}>
                <Image src={bannerImage} alt="banner" />
            </Box>

            <Block>
                <Row justifyContent="space-between">
                    <Button variant="normal">О групповых покупках</Button>
                    <Button variant="normal">Доставка</Button>
                    <Button variant="normal">Помощь</Button>
                    <Button variant="normal">Получи бесплатно</Button>
                    <Button variant="normal">Выгодные товары дня</Button>
                </Row>
            </Block>

            <Block>
                <Column id="offers-list-container">
                    <Box paddingBottom="16px">
                        <Text weight={600} size={20}>
                            Рекомендации для вас
                        </Text>
                    </Box>

                    <Box className={css.grid}>
                        {offers.map(offer => (
                            <OfferCard key={`${offer.id}`} {...offer} />
                        ))}
                        <OffersList />
                    </Box>

                    <OffersListLoader />
                </Column>
            </Block>
        </Column>
    );
}

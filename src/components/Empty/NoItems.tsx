import {LinkButton} from '../Button';
import {Footer} from '../Footer';
import {Column} from '../layout/Column';
import {Text} from '../Text';

type Props = {
    title: string;
    description: string;
};

export const NoItems = ({title, description}: Props) => {
    return (
        <Column justifyContent="space-between" height="100%">
            <div />
            <Column gap="2" alignItems="center" paddingX={7}>
                <Text size={20} weight={500}>
                    {title}
                </Text>
                <Text size={14} weight={400} color="#303234A3" align="center">
                    {description}
                </Text>
            </Column>
            <Footer>
                <LinkButton width="full" href="/">
                    Перейти в каталог
                </LinkButton>
            </Footer>
        </Column>
    );
};

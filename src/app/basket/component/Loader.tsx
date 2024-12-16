import {Row} from '@/components/layout/Row';
import {Loader as AppLoader} from '@/components/Loader';

export const Loader = () => {
    return (
        <Row justifyContent="center">
            <AppLoader />
        </Row>
    );
};

import {Box} from '../layout/Box';

type Props = {
    align?: 'horizontal' | 'vertical';
};

export const Separator = (props: Props) => {
    const {align = 'horizontal'} = props;

    if (align === 'vertical') {
        return <Box background="#9CA3AA52" width={1} height="100%" />;
    }

    return <Box background="#9CA3AA52" height={1} width="100%" />;
};

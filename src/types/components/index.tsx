import {ReactNode} from 'react';

type TogglerProps = {onClick: () => void};

type TogglerComponent = (props: TogglerProps) => ReactNode;

export type PropsWithToggler<P> = P & {Toggler: TogglerComponent};

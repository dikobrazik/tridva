import {Icon, IconName} from '../Icon';
import css from './TextField.module.scss';

type Props = {
    icon?: IconName;
};

export const TextField = (props: Props) => {
    const {icon} = props;
    return (
        <span className={css.container}>
            <input className={css.input} name="search" placeholder="Искать товары и категории" />
            {icon && <Icon className={css.icon} name={icon} />}
        </span>
    );
};

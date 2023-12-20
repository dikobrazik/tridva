import css from './TextField.module.css';

export const TextField = () => {
    return <input className={css.input} name="search" placeholder="Искать товары и категории" />;
};

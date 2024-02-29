import css from './Checkbox.module.scss';

type Props = {
    name: string;
};

export const Checkbox = (props: Props) => {
    const {name} = props;
    return (
        <label className={css.label} htmlFor={name}>
            <input name={name} />
        </label>
    );
};

import Logo from "../Logo/Logo";
import s from "../Header/styles.module.css"

export default function Header(){
    return (
        <div className={s.header}>
            <Logo/>
        </div>
    );
}

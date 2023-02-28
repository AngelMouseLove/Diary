import Logo from "../Logo/Logo";
import s from "../Header/styles.module.css"
import Menu from "../Menu/Menu";

export default function Header(){
    return (
        <div className={s.header}>
            <Logo/>
            <Menu/>
            <div>
              
            </div>
        </div>
    );
}

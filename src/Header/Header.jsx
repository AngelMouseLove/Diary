import s from "../Header/styles.module.css";

export default function Header({children}) {

  return (
    <div className={s.header}>
        {children}
    </div>
  )
};

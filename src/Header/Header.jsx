import s from "../Header/styles.module.css";

export default function Header({ children }) {
  return <header className={s.header}>{children}</header>;
}

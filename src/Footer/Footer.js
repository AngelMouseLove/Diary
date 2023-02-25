import s from "../Footer/styles.module.css";
import Logo from "../Logo/Logo";

function Footer() {
  return (
    <div className={s.footer}>
      <Logo />
      <span>2023 copyright. All rights reserved</span>
    </div>
  );
}
export default Footer;

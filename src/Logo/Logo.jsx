import s from "../Logo/styles.module.css";
import book from "../Logo/img/Logo.svg";

export default function Logo({ onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <a className={s.linkLogo} onClick={handleClick}>
      <div className={s.logo}>
        <img className={s.img} src={book} alt="book" />
        <span className={s.title}>DIARY</span>
      </div>
    </a>
  );
}

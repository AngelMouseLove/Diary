import s from '../Logo/styles.module.css';
import book from '../Logo/img/book.png'

export default function Logo() {
  return (
    <a className={s.linkLogo} href="">
      <div className={s.logo}>
        <span>Diary</span>
        <img className={s.img} src={book} alt="book" />
      </div>
    </a>
  )
}

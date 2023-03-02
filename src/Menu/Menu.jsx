import s from '../Menu/styles.module.css'

const Menu = () => {
  return (
    <div className={s.menu}>
      <ul className={s.navigation}>
        <li className={s.item} >
          <a className={s.link} href="#">О себе</a>
        </li>
        <li className={s.item}>
          <a className={s.link} href="#">Мои друзья</a>
        </li>
        <li className={s.item}>
          <a className={s.link} href="#">Мои контакты</a>
        </li>
        <li className={s.item}>
          <a className={s.link} href="#">Оставить заметку</a>
        </li>
      </ul>
    </div>
  )
}

export default Menu;
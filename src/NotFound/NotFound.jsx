import s from '../NotFound/styles.module.css'

const NotFound = () => {
  return (
    <div style={{display: 'none'}} className={s.main}> {/* Удалить display : 'none', чтобы увидеть компонент */}
      <div className={s.center}>
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <a href="#"> go to homepage</a>
      </div>
    </div>
  )
}

export default NotFound
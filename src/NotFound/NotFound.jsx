import s from '../NotFound/styles.module.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className={s.main}> 
      <div className={s.center}>
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <button className={s.btn} onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </div>
  )
}

export default NotFound
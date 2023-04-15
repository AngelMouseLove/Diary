import { Discuss } from 'react-loader-spinner';
import s from './style.module.css'

function Spinner() {

// - type - тип анимации (Puff, Audio, BallTriangle, Bars, Circles, Grid, Hearts, Oval, Rings, TailSpin, ThreeDots)
// - color - цвет лоадера
// - height - высота лоадера в пикселях
// - width - ширина лоадера в пикселях
// - timeout - время (в миллисекундах), после которого лоадер будет автоматически скрыт

    return (
        <div className={s.spinner}>
            <Discuss
                type="Puff"
                color="#00BFFF"
                height={200}
                width={200}
                timeout={30000} //3 secs
            />
        </div>
    );    
}

export default Spinner;
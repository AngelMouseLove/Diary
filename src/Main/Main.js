import s from '../Main/style.module.css';
import articls from '../data/articls.json';


function Main(){
    return(
        <div className="Main">
            {/* выведем заголовки и описание*/}
            {/* {articls.map(item=><h2>{item.title}</h2>)} */}
        
            {articls.map((item, index)=>
            <section key={item.title} className={s.section}>
                <h2 key={index}>{item.title}</h2>
                <div key={item.body}>{item.body}</div>
            </section>
            )}
        </div>
    );
}

export default Main;
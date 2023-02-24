import './Main.css';
import articls from '../data/articls.json';


function Main(){
    return(
        <div className="Main">
            {/* выведем заголовки */}
            {/* {articls.map(item=><h2>{item.title}</h2>)} */}
        
            {articls.map(item=>
            <section>
                <h2>{item.title}</h2>
                <div>{item.body}</div>
            </section>
            )}
        </div>
    );
}

export default Main;
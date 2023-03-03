import s from '../Main/style.module.css';
import articles from '../data/articls.json';
import BasicCard from '../Card/BasicCard';
import { Card, Grid } from '@mui/material';


function Main(){
    return(
        <>
        <Grid container spacing={4} className={s.gridContainer}>
            {
                articles.map(item=>
                    <Grid key={item.title} item xs={12} sm={6} md={4}>
                        <BasicCard article={item} />
                    </Grid>
                )
            }
        </Grid>
        </>
    );
}

export default Main;
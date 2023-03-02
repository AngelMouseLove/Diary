import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import sky from '../img/sky.jpg'
import { CardActionArea } from '@mui/material';
import { MAX_CARD_BODY_LENGTH } from '../constants'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cropBody = function(body) {
  console.log(MAX_CARD_BODY_LENGTH)
  if (body.length > MAX_CARD_BODY_LENGTH) {
    return body.substring(0, body.substr(0, MAX_CARD_BODY_LENGTH).lastIndexOf(" ")) + " ...";
  }
  return body;
}

export default function BasicCard({article}) {
  console.log(article)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.title}
        subheader="September 14, 2016"
      />
        {/* Если нужно будет добавить картинку, то сделать условный оператор imageExist && <CardMedia ... */}
      <CardMedia
        component="img"
        height="194"
        image={sky}
        alt="Sky"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {
            cropBody(article.body)
          }
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
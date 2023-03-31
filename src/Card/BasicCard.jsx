import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { CardActionArea, Dialog } from "@mui/material";
import moment from "moment";
import "moment/locale/ru";
import { MAX_CARD_BODY_LENGTH, DATE_PATTERN } from "../constants";
import { Link } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import s from "../Card/style.module.css";
import SetPostContentForm from "./../SetPostContentForm/SetPostContentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cropText = function (text) {
  if (text.length > MAX_CARD_BODY_LENGTH) {
    return (
      text.substring(0, text.substr(0, MAX_CARD_BODY_LENGTH).lastIndexOf(" ")) +
      " ..."
    );
  }
  return text;
};

export default function BasicCard({
  _id,
  title,
  image,
  text,
  delPost,
  post,
  isLiked,
  onLike,
}) {
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleOpenModalDel = () => {
    setOpenModalDel(true);
  };
  const handleCloseModalDel = () => {
    setOpenModalDel(false);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleLike = () => {
    onLike();
  };

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
            // <IconButton aria-label="settings">
            <MoreVertIcon />
            // </IconButton>
          }
          title={moment(title, DATE_PATTERN).format("Do MMMM YYYY, dddd")}
          // subheader="September 14, 2016"
        />
        <Link to={`/posts/${_id}`}>
          {/* Если нужно будет добавить картинку, то сделать условный оператор imageExist && <CardMedia ... */}
          <CardMedia component="img" height="194" image={image} alt="Sky" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {cropText(text)}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon className={isLiked ? s.liked : s.notLiked} />
        </IconButton>
        <IconButton>
          <EditIcon
            onClick={handleOpenModalEdit}
          />
        </IconButton>
        <Dialog
          open={openModalEdit}
          onClose={handleCloseModalEdit}
          fullWidth={true}
          maxWidth="sm"
          scroll="body"
        >
          <SetPostContentForm post={post} _id={_id} close={handleCloseModalEdit}/>
        </Dialog>
        <IconButton>
          <DeleteIcon onClick={handleOpenModalDel} />
        </IconButton>
        <Dialog
          open={openModalDel}
          onClose={handleCloseModalDel}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Вы уверены что хотите удалить пост?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Удаленный пост уже нельзя будет восстановить.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                delPost(post);
                handleCloseModalDel();
              }}
            >
              Удалить
            </Button>
            <Button onClick={handleCloseModalDel} autoFocus>
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}

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
import { useState, useContext } from "react";
import { CardActionArea, Dialog } from "@mui/material";
import moment from "moment";
import "moment/locale/ru";
import { MAX_CARD_BODY_LENGTH, DATE_PATTERN } from "../constants";
import { Link } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SetPostContentForm from "../SetPostContentForm/SetPostContentForm";
import LikeButton from "../LikeButton/LikeButton";
import { checkIsLiked } from "../utils";
import { UserContext } from "../context/UserContext";
import MessageIcon from "@mui/icons-material/Message";
import NotesIcon from "@mui/icons-material/Notes";

const cropText = function (text) {
  if (text.length > MAX_CARD_BODY_LENGTH) {
    return (
      text.substring(0, text.substr(0, MAX_CARD_BODY_LENGTH).lastIndexOf(" ")) +
      " ..."
    );
  }
  return text;
};

function PostCard({
  _id,
  title,
  image,
  text,
  delPost,
  createPost,
  post,
  likes,
  onLike,
  tags,
  comments,
}) {
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const { currentUser } = useContext(UserContext);

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
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <NotesIcon />
            </Avatar>
          }
          title={moment(title, DATE_PATTERN).format("Do MMMM YYYY, dddd")}
          // subheader="September 14, 2016"
        />
        <Link to={`/posts/${_id}`} style={{ textDecoration: "none" }}>
          {/* Если нужно будет добавить картинку, то сделать условный оператор imageExist && <CardMedia ... */}
          <CardMedia component="img" height="194" image={image} alt="Sky" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {cropText(text)}
            </Typography>
          </CardContent>
        </Link>
        <Box sx={{ display: "flex", gap: 1, pl: 2, pr: 2, mb: 1 }}>
          {tags &&
            tags.map((tag) => (
              <Box
                key={tag}
                component="span"
                sx={{
                  backgroundColor: "#273f96",
                  color: "#ffffff",
                  padding: "5px",
                  borderRadius: "3px",
                }}
              >
                {tag}
              </Box>
            ))}
        </Box>
      </CardActionArea>

      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <LikeButton
            isLiked={checkIsLiked(likes, currentUser._id)}
            onClick={handleLike}
          />{" "}
          <span>{(likes.length || likes.length !== 0) && likes.length}</span>
          {(comments.length || comments.length !== 0) && (
            <>
              <MessageIcon />
              <span>
                {(comments.length || comments.length !== 0) && comments.length}
              </span>
            </>
          )}
        </Box>

        <IconButton onClick={handleOpenModalEdit}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={handleOpenModalDel}>
          <DeleteIcon />
        </IconButton>
      </CardActions>

      <Dialog
        open={openModalEdit}
        onClose={handleCloseModalEdit}
        fullWidth={true}
        maxWidth="sm"
        scroll="body"
      >
        <SetPostContentForm
          post={post}
          _id={_id}
          close={handleCloseModalEdit}
          delPost={delPost}
          createPost={createPost}
        />
      </Dialog>
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
    </Card>
  );
}

export default PostCard;

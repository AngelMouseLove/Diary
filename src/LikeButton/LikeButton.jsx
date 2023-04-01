import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import s from './style.module.css'

function LikeButton({isLiked, onClick}) {

    const handleLike = () => {
        onClick();
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon className={isLiked ? s.liked : s.notLiked} />
        </IconButton>
    );
}

export default LikeButton;
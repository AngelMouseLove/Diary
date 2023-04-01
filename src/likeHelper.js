export const addIsLikedToPost = (post, userId) => {
    if (post.likes.includes(userId)) {
      return { ...post, isLiked: true };
    } else {
      return { ...post, isLiked: false };
    }
  }; // TODO: сделать поле вычисляемое
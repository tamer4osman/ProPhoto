import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const { posts, token } = useSelector((state) => state);

  const fetchData = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  };

  const getPosts = async () => {
    const data = await fetchData(`${import.meta.env.VITE_API_URL}/posts`);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const data = await fetchData(
      `${import.meta.env.VITE_API_URL}/posts/${userId}/posts`
    );
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    isProfile ? getUserPosts() : getPosts();
  }, []);

  return (
    <>
      {!posts ? <p>Loading</p> : (
        posts.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />)
        )
      )}
    </>
  );
};

export default PostsWidget;

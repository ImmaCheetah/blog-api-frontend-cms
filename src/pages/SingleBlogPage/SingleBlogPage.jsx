import styles from "./SingleBlogPage.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CommentSection from "../../components/CommentSection/CommentSection";
import parse from "html-react-parser";
import Error from "../../components/Error/Error";

export default function SingleBlogPage() {
  let { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function handleCommentDelete(commentId) {
    setComments(
      comments.filter((comment) => {
        return comment.id !== commentId;
      }),
    );
  }

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
          method: "GET",
        });

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          setPost(res.post);
          setComments(res.post.comments);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Error name={error.name} status={error.status} message={error.errorMsg} />
    );

  return (
    <>
      {post && (
        <div className={styles.postDiv}>
          <div className={styles.postHeader}>
            <h2>{post.title}</h2>
            <p>Written By: {post.author.username}</p>
            <p>{formatDate(post.timestamp)}</p>
          </div>
          <div className={styles.postContent}>{parse(post.content)}</div>
          <CommentSection
            comments={comments}
            handleCommentDelete={handleCommentDelete}
          />
        </div>
      )}
    </>
  );
}

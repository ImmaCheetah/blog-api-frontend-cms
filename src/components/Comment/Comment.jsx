import { useParams } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./Comment.module.css";


/* eslint-disable react/prop-types */
export default function Comment({ author, content, timestamp, commentId, handleCommentDelete }) {
  const auth = useAuth();
  let { postId } = useParams();

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function deleteFetch(postId, commentId) {
    try {
      await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  function handleDelete() {
    handleCommentDelete(commentId);
    deleteFetch(postId, commentId);
  }

  return (
    <div className={styles.commentDiv}>
      <div className={styles.commentHeader}>
        <p className={styles.commentAuthor}>{author}</p>
        <p className={styles.commentDate}>{formatDate(timestamp)}</p>
      </div>
      <p>{content}</p>
      <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
    </div>
  );
}

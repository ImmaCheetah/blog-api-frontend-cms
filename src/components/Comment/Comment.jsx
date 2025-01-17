import { useParams } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./Comment.module.css";
import { toast } from "react-toastify";

export default function Comment({
  author,
  content,
  timestamp,
  commentId,
  handleCommentDelete,
}) {
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        },
      );

      if (response.status >= 400) {
        toast.error("Failed to delete comment", {
          position: "bottom-right",
        });
      }

      if (response.status === 200) {
        toast.success("Comment deleted!", {
          position: "bottom-right",
        });
      }

    } catch (error) {
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
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./BlogTable.module.css";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";

export default function BlogTable({
  title,
  content,
  timestamp,
  author,
  postId,
  isPublished,
  handleIsPublishedState,
  handleDeleteState,
}) {
  const auth = useAuth();

  async function publishFetch(postId) {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          isPublished: isPublished ? "unpublish" : "publish",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
      const res = await response.json();

      if (response.status === 200) {
        res.isPublished
          ? toast.success("Post published!", {
              position: "bottom-right",
            })
          : toast.success("Post unpublished!", {
              position: "bottom-right",
            });
        handleIsPublishedState(postId);
      } else {
        toast.error("Failed to publish post", {
          position: "bottom-right",
        });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePublish() {
    publishFetch(postId);
    // handleIsPublishedState(postId);
  }

  async function deleteFetch(postId) {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });

      if (response.status === 200) {
        toast.success("Post deleted!", {
          position: "bottom-right",
        });
      } else {
        toast.error("Failed to delete post", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete() {
    deleteFetch(postId);
    handleDeleteState(postId);
  }

  return (
    <tbody className={styles.tbody}>
      <tr>
        <td data-cell="title">{title}</td>
        <td data-cell="author">{author}</td>
        <td data-cell="timestamp">{timestamp}</td>
        <td data-cell="content" className={styles.contentData}>
          {parse(content)}
        </td>
        <td data-cell="actions">
          <div className={styles.buttonsDiv}>
            <Link to={"/posts/" + postId} className={styles.viewBtn}>
              View
            </Link>
            <Link className={styles.editBtn} to={"/posts/edit/" + postId}>
              Edit
            </Link>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Delete
            </button>
            {isPublished ? (
              <button className={styles.unpublishBtn} onClick={handlePublish}>
                Unpublish
              </button>
            ) : (
              <button className={styles.publishBtn} onClick={handlePublish}>
                Publish
              </button>
            )}
          </div>
        </td>
      </tr>
    </tbody>
  );
}

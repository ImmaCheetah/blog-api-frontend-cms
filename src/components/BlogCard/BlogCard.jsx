import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./BlogCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';


/* eslint-disable react/prop-types */
export default function BlogCard({
  title,
  content,
  timestamp,
  author,
  postId,
  isPublished,
  handleIsPublished
}) {
  const auth = useAuth();
  const navigate = useNavigate();

  async function publishFetch(postId) {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          isPublished: isPublished ? "unpublish" : "publish",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token
        }
      })

      const res = await response.json();
      console.log(res)
      

    } catch(error) {
      console.log(error);
    }
  }

  async function handlePublish() {
    console.log(postId);
    handleIsPublished(postId);
    publishFetch(postId);
    navigate('/posts')
  }

  return (
    <div className={styles.cardDiv}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
        <p>{timestamp}</p>
      {parse(content)}. . .
      </div>
      <div className={styles.buttonsDiv}>
        <Link to={"/posts/" + postId} className={styles.viewBtn}>
          View
        </Link>
        <button className={styles.editBtn}>Edit</button>
        <button className={styles.deleteBtn}>Delete</button>
        {
          isPublished ?
          <button className={styles.unpublishBtn} onClick={handlePublish}>Unpublish</button>
          :
          <button className={styles.publishBtn} onClick={handlePublish}>Publish</button>
        }
      </div>
    </div>
  );
}

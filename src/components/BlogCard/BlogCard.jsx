import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./BlogCard.module.css";
import { Link } from "react-router-dom";


/* eslint-disable react/prop-types */
export default function BlogCard({
  title,
  content,
  timestamp,
  author,
  postId,
  isPublished
}) {
  const auth = useAuth();
  

  async function handlePublish() {
    console.log(postId);
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

  return (
    <div className={styles.cardDiv}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
        <p>{timestamp}</p>
      </div>
      <p>{content}. . .</p>
      <Link to={"/posts/" + postId} className={styles.cardBtn}>
        View Post
      </Link>
      {
        isPublished ? 
        <button className={styles.unpublishBtn} onClick={handlePublish}>Unpublish</button>
        :
        <button className={styles.publishBtn} onClick={handlePublish}>Publish</button>
      }
    </div>
  );
}

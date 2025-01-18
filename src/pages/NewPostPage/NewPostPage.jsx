import styles from "./NewPostPage.module.css";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewPostPage() {
  let navigate = useNavigate();
  const editorRef = useRef(null);
  const auth = useAuth();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const content = editorRef.current.getContent();

    newPostFetch(title, content);
    navigate("/posts");
  }

  async function newPostFetch(title, content) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });

      if (response.status >= 400) {
        toast.error("Failed to create post", {
          position: "bottom-right",
        });
      }

      if (response.status === 200) {
        toast.success("Post created!", {
          position: "bottom-right",
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"></label>
        <input
          className={styles.title}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextEditor editorRef={editorRef} />
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

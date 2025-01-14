import styles from "./NewPostPage.module.css";
import { useRef, useEffect, useState } from 'react';
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import TextEditor from "../../components/TextEditor/TextEditor";


export default function NewPostPage() {
  const editorRef = useRef(null);
  const auth = useAuth();
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const content = editorRef.current.getContent();
    const title = form.get("title");

    newPostFetch(title, content);
  }

  async function newPostFetch(title, content) {
    try {
      const response = await fetch(`http://localhost:8080/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      })

      const res = await response.json();
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <TextEditor editorRef={editorRef}/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
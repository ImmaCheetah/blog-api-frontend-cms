import styles from "./EditBlogPage.module.css";
import { useRef, useEffect, useState } from 'react';
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import TextEditor from '../../components/TextEditor/TextEditor';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditBlogPage() {
  const auth = useAuth();
  let { postId } = useParams();
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          console.log(res.post);
          setPost(res.post);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  async function editPostFetch(postId, title, content) {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      })
      
      if (response.status >= 400) {
        toast.error('Failed to update post', {
          position: 'bottom-right',
        })
      }

      if (response.status === 200) {
        toast.success('Post updated!', {
          position: 'bottom-right',
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const content = editorRef.current.getContent();
    const title = form.get("title");

    editPostFetch(postId, title, content)
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
          defaultValue={post.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextEditor 
          content={post.content} 
          editorRef={editorRef} 
        />
        <button 
          className={styles.submitBtn} 
          type="submit"
        >
        Update
        </button>
      </form>
    </>
  )
}
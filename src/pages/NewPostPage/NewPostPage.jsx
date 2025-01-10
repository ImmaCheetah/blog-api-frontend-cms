import styles from "./NewPostPage.module.css";
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from "../../components/AuthProvider/AuthProvider";


export default function NewPostPage() {
  const editorRef = useRef(null);
  const auth = useAuth();
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/api-key`, {
          method: "POST",
        });

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          setApiKey(res.apiKey);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

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

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <Editor
          apiKey={apiKey}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            min_height: 300,
            selector: 'textarea',
            width: 800,
            resize: true,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
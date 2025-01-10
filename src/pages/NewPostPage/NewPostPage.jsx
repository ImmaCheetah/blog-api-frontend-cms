import styles from "./NewPostPage.module.css";
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function NewPostPage() {
  const editorRef = useRef(null);
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


  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
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
      <button onClick={log}>Log editor content</button>
    </>
  )
}
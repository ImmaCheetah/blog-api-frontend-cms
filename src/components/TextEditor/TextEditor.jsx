import styles from "./TextEditor.module.css";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

export default function TextEditor({ content, editorRef }) {
  // const editorRef = useRef(null);
  const auth = useAuth();
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/api-key`, {
          method: "POST",
          headers: {
            Authorization: auth.token,
          },
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.mceWrapper}>
      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content ? content : "Start your blog"}
        init={{
          height: 500,
          min_height: 300,
          selector: "textarea",
          resize: true,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

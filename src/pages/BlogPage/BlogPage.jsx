import styles from "./BlogPage.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import BlogTable from "../../components/BlogTable/BlogTable";
import Error from "../../components/Error/Error";

export default function BlogPage() {
  const auth = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPublished, setIsPublished] = useState([]);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function limitText(content) {
    return content.slice(0, 100);
  }

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
          method: "GET",
          headers: {
            Authorization: auth.token,
          },
        });
        const res = await response.json();

        if (response.status >= 400) {
          setError(res);
        }

        if (response.status === 200) {
          setPosts(res.posts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  function handleIsPublishedState(postId) {
    const newIsPublished = posts.map((post) => {
      if (post.id === postId) {
        post.isPublished = !post.isPublished;
        return post;
      } else {
        return post;
      }
    });

    setIsPublished(newIsPublished);
  }

  function handleDeleteState(postId) {
    setPosts(
      posts.filter((post) => {
        return post.id !== postId;
      }),
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Error name={error.name} status={error.status} message={error.errorMsg} />
    );

  return (
    <>
      {
        auth.token ?
        <table>
          <thead>
            <tr>
              <th>Blog Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          {posts.map((post) => {
            return (
              <BlogTable
                key={post.id}
                title={post.title}
                content={limitText(post.content)}
                timestamp={formatDate(post.timestamp)}
                author={post.author.username}
                postId={post.id}
                isPublished={post.isPublished}
                handleIsPublishedState={handleIsPublishedState}
                handleDeleteState={handleDeleteState}
              />
            );
          })}
        </table>
        :
        <p>Not authorized</p>
      }
    </>
  );
}

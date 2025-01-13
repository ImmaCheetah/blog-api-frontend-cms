import styles from "./BlogPage.module.css";
import { useState, useEffect } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
// import Error from "../../components/Error/Error";



export default function SignUpPage() {
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
        const response = await fetch(`http://localhost:8080/posts`, {
          method: "GET",
          headers: {
            Authorization: auth.token
          }
        });

        if (response.status >= 400) {
          const errors = await response.json();
          console.log(errors);
          setError(errors);
        }

        if (response.status === 200) {
          const res = await response.json();
          console.log(res.posts);
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
        post.isPublished = !post.isPublished
        return post;
      } else {
        return post;
      }
    })

    setIsPublished(newIsPublished);
  }

  function handleDeleteState(postId) {
    setPosts(posts.filter(post => {
      return post.id !== postId
    }))
  }

  if (loading) return <p>Loading...</p>;
  // if (error)
  //   return (
  //     <Error name={error.name} status={error.status} message={error.errorMsg} />
  //   );

  return (
    <>
      {posts && (
        <div className={styles.postsDiv}>
          {posts.map((post) => {
            return (
              <BlogCard
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
        </div>
      )}
    </>
  );
}

import App from "./App";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage/SingleBlogPage";
import EditBlogPage from "./pages/EditBlogPage/EditBlogPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "posts", element: <BlogPage /> },
      { path: "posts/new", element: <NewPostPage /> },
      { path: "posts/:postId", element: <SingleBlogPage /> },
      { path: "posts/edit/:postId", element: <EditBlogPage /> },
    ],
  },
];

export default routes;

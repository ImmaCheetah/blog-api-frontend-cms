import App from "./App";
// import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import BlogPage from "./pages/BlogPage/BlogPage";
// import SignUpPage from "./pages/SignUpPage/SignUpPage";
// import SingleBlogPage from "./pages/SingleBlogPage/SingleBlogPage";
// import AuthorSignUp from "./pages/AuthorSignUp/AuthorSignUp";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "posts", element: <BlogPage /> },
      { path: "posts/new", element: <NewPostPage /> },
      // { path: "posts/:postId", element: <SingleBlogPage /> },
      // { path: "user/author/sign-up", element: <AuthorSignUp /> },
    ],
  },
];

export default routes;
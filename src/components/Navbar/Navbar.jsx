import styles from "./Navbar.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const auth = useAuth();

  return (
    <nav>
      <NavLink className={styles.blogNameLink} to="/">
        <button className={styles.blogName}>Blog and Such Studio</button>
      </NavLink>
      {auth.token ? (
        <>
          <NavLink to="/posts">
            <button className={styles.navBtn}>Posts</button>
          </NavLink>
          <NavLink to="/posts/new">
            <button className={styles.navBtn}>New Post</button>
          </NavLink>
          <button className={styles.navBtn} onClick={() => auth.logOut()}>
            Log Out
          </button>
        </>
      ) : (
        <NavLink to="/login">
          <button className={styles.navBtn}>Login</button>
        </NavLink>
      )}
    </nav>
  );
}

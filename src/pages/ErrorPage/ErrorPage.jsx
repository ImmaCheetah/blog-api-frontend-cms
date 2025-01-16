import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <h1>Seems you got lost</h1>
      <p>
        Return to <Link to={"/"}>Home</Link>
      </p>
    </>
  );
}

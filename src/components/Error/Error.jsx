export default function Error({ name, status, message }) {
  return (
    <>
      <h2>
        {status} Error: {name}
      </h2>
      <h3>{message}</h3>
    </>
  );
}

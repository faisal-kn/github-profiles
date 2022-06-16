const ErrorCard = (message) => {
  console.log(message);
  return (
    <div className="card">
      <h1>{message.message}</h1>
    </div>
  );
};

export default ErrorCard;

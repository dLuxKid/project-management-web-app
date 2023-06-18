import "../styles/error.css";

type Props = {
  error: string;
};

const Error: React.FC<Props> = ({ error }) => {
  return (
    <div className="error-section">
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>
          Error <span className="errorcode">but not 404</span>
        </h1>
        <p className="output">{error}</p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  );
};

export default Error;

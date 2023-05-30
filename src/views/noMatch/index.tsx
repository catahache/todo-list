import { Link } from "react-router-dom";
import { FC } from "react";

const NoMatch: FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page of the app</Link>
      </p>
    </div>
  );
};

export default NoMatch;
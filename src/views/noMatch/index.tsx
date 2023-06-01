import { Link } from "react-router-dom";
import { FC } from "react";

const NoMatch: FC = () => {
  return (
    <div>
      <h2>¡Nada que ver aquí!</h2>
      <p>
        <Link to="/">Ir a la página principal</Link>
      </p>
    </div>
  );
};

export default NoMatch;
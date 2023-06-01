import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>¡No estás logueado!</h1>
      <br />
      <p>Necesitás loguearte para acceder a esta página</p>
      <div>
        <button onClick={goBack}>Ir atrás</button>
      </div>
    </section>
  );
};

export default Unauthorized;
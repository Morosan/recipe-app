import { Login } from "../components/login";
import { Register } from "../components/register";

export const Auth = () => {
  return (
    <section className="container mb-5">
      <div className="row">
        <div className="col-6">
          <Login />
        </div>

        <div className="col-6">
          <Register />
        </div>
      </div>
    </section>
  );
};


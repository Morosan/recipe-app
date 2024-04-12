import { Login } from "../components/login";
import { Register } from "../components/register";

export const Auth = () => {
  return (
    <section className="container mb-5 authentication">
      <h1 className="main-heading mb-5">Authentication Page</h1>
      <div className="row g-5">
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


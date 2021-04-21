import { Fragment } from "react";
import logo from "../assets/logo192.png";
export default function Index() {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row justify-content-center space-between__viewport-brand">
          <div className="col-auto navbar-brand d-flex flex-row align-items-center">
            <img width="192" src={logo} alt="Logo" />
            <div className="display-1 space-between__main-brand">Lapor</div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center margin-top__3rem">
          <a className="btn btn-primary col-2 btn-lg" href="/login">
            Login
          </a>
          <a
            className="btn btn-outline-primary col-2 offset-md-1 btn-lg"
            href="/register"
          >
            Daftar
          </a>
        </div>
      </div>
    </Fragment>
  );
}

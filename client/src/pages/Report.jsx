import { Form } from "../components/Form";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "./style.css";
import logo from "../assets/logo64.png";

export default function Report() {
  const [state, setState] = useState({
    content: "",
    status: "",
    laporan: [],
    id_user: JSON.parse(sessionStorage.getItem("id")),
    token: JSON.parse(sessionStorage.getItem("token")),
    username: JSON.parse(sessionStorage.getItem("username")),
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/login";
    } else {
      axios
        .get(`http://localhost:6809/report/user/${state.id_user}`, {headers: {token : state.token}})
        .then(({ data }) => {
          console.table(data);
          setState((state) => ({ ...state, laporan: data }));
          // window.location.assign('/report')
        })
        .catch((err) => console.log(err));
    }
  }, [state.id_user]);

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios
      .post("http://localhost:6809/report", state, {headers: {token : state.token}})
      .then(({ data }) => {})
      .catch((err) => console.log(err));
    window.location.reload();
    $("#entry-point").removeClass("d-none");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (
    <Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light smooth-shadow">
        <div className="navbar-brand">
          <img width="40" src={logo} alt="Logo" />
          {/*<div className="margin-left__1rem display-5 larger-font-size text-dark">Lapor</div>*/}
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <a className="nav-link active cursor-default" href="#">
                Beranda <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reportindex">
                List Aduan
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/edituser">
              Edit User
            </a>
          </li>
            <li className="nav-item ml-auto">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row justify-content-center space-between__viewport-logo2">
          <div className="col-md-5 text-dark">
            <Form onSubmit={handleSubmit}>
              <div className="h1">Hai {state.username.charAt(0).toUpperCase() +
                state.username.slice(1)},</div>
              <div className="h3">Apa yang ingin anda sampaikan?</div>
              <textarea
                rows="7"
                className="form-control space-between__label-h3"
                name="content"
                placeholder="Tulis aduan mu di sini"
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="col-4 ml-auto btn btn-md btn-primary repBtn space-between__viewport-logo"
              >
                Kirim pesan
              </button>
              <div id="entry-point" className="d-none text-success">
                Success
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

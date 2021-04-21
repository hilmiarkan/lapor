import { Form, Input } from "../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo64.png";

export default function Register() {
  const [state, setState] = useState({
    email: "",
    username: "",
    telp: 0,
    password: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    const userId = JSON.parse(sessionStorage.getItem("id"));
    e.preventDefault();
    axios
      .put(`http://localhost:6809/user/${userId}`, state, {headers: {token : state.token}} )
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    window.location.reload()
  };

  const getUserData = () => {
    const userId = JSON.parse(sessionStorage.getItem("id"));
    console.log("user id = " + userId);
    axios
      .get("http://localhost:6809/user", {headers: {token : state.token}})
      .then(({ data }) => {
        let arr = data.filter((data) => {
          return data.id_user === userId;
        });
        arr = arr[0];
        const { email, username, telp, password } = arr;
        setState({ email, username, telp, password });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
              <a className="nav-link" href="/report">
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reportindex">
                List Aduan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link  active cursor-default" href="#">
                Edit User <span className="sr-only">(current)</span>
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
        <div className="row justify-content-center">
          <div className="col-8 bg-light">
            <div className="text-dark">
              <Form
                onSubmit={handleSubmit}
                className="needs-validation"
                novalidate
              >
                <div className="row justify-content-center">
                  <div className="col-sm-6 margin-top__5rem">
                    <div className="h3 space-between__h3-logo">
                      Ganti data profil anda
                    </div>
                    <label className="space-between__label-h3" htmlFor="email">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder={state.email}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="username">Nama Panggilan</label>
                    <Input
                      name="username"
                      type="text"
                      placeholder={state.username}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="username">No Telp</label>
                    <Input
                      name="telp"
                      type="text"
                      placeholder={state.telp}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="password">Password</label>
                    <Input
                      name="password"
                      type="password"
                      placeholder={state.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="d-flex flex-row align-items-center">
                      <p className="no-margin">
                        <a href="#"></a>
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary col-4 ml-auto"
                      >
                        Berikutnya
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

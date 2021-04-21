import { Form, Input } from "../components/Form";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import logo from "../assets/logo64.png";

export default function Login() {
  const [state, setState] = useState({ email: "", password: "", message: "" });

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios
      .post("http://localhost:6809/staff/auth", state, {headers: {token : state.token}})
      .then(({ data }) => {
        if (data.message) { // jika error
          setState((state) => ({
            ...state,
            message: data.message,
          }));
        } else {
          sessionStorage.setItem("email", JSON.stringify(data.email));
          sessionStorage.setItem("id", JSON.stringify(data.id_staff));
          sessionStorage.setItem("username", JSON.stringify(data.username));
          sessionStorage.setItem("password", JSON.stringify(data.password));
          sessionStorage.setItem("tokenStaff", JSON.stringify(data.tokenStaff));
          window.location.assign("/staffindex");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row vh-100 justify-content-center">
        <div className="col-8 bg-light no-padding">
          <div className="text-dark">
            <Form onSubmit={handleSubmit} className="needs-validation" novalidate>
              <div className="row justify-content-center">
                <div className="col-sm-6">
                  <img
                    className="space-between__viewport-logo2"
                    src={logo}
                    alt="Logo"
                  />
                  <div className="h3 space-between__h3-logo">Staff Login</div>
                  <label className="space-between__label-h3" htmlFor="email">
                    Email
                  </label>
                  <Input
                    name="email"
                    placeholder="masukkan email anda"
                    type="email"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <Input
                    name="password"
                    placeholder="masukkan password anda"
                    type="password"
                    onChange={handleChange}
                    required
                  />{" "}
                  {state.message && (
                    <div id="message entry w-100 rounded bg-danger">
                      {state.message}
                    </div>
                  )}
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
        <div className="col-4 vh-100 side-photo"> </div>
      </div>
    </div>
  );
}

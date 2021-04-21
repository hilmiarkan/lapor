import { Form, Input } from "../components/Form";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo64.png";

export default function Register() {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
    telp: "",
  });

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user", state, {headers: {token : state.token}})
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    window.location.assign("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 justify-content-center">
        <div className="col-8 bg-light">
          <div className="text-dark">
            <Form onSubmit={handleSubmit} className="needs-validation" novalidate>
              <div className="row justify-content-center">
                <div className="col-sm-6">
                  <img
                    className="space-between__viewport-logo"
                    src={logo}
                    alt="Logo"
                  />
                  <div className="h3 space-between__h3-logo">
                    Buat akun Lapor anda
                  </div>
                  <label className="space-between__label-h3" htmlFor="email">
                    Email
                  </label>
                  <Input
                    name="email"
                    placeholder="cnth: hilmi@gmail.com"
                    type="email"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="username">Nama Panggilan</label>
                  <Input
                    name="username"
                    placeholder="cnth: Hilmi"
                    type="text"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="telp">Nomer Telepon</label>
                  <Input
                    name="telp"
                    placeholder="cnth: 08123456789"
                    type="number"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <Input
                    name="password"
                    placeholder=""
                    type="password"
                    onChange={handleChange}
                    required
                  />
                  <div className="d-flex flex-row align-items-center">
                    <p className="no-margin">
                      <a href="/login">Saya sudah punya akun</a>
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

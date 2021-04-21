import { Form, Input } from "../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import logo from "../assets/logo64.png";

export default function Admindex() {
  const [state, setState] = useState({
    token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
    pendingReport: 0,
    totalReport: 0,
    totalUser: 0,
    totalStaff: 0
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/admin";
    } else {
      axios

        .get(`http://localhost:6809/report/user/pending`, {headers: {token : state.token}})
        .then(({ data }) => {
          setState((state) => ({ ...state, pendingReport: data.length }));

          axios
            .get(`http://localhost:6809/report/user/total`, {headers: {token : state.token}})
            .then(({ data }) => {
              setState((state) => ({ ...state, totalReport: data.length }));

              axios
              .get(`http://localhost:6809/user`, {headers: {token : state.token}})
              .then(({ data }) => {
                setState((state) => ({ ...state, totalUser: data.length }));

                axios
                .get(`http://localhost:6809/staff`, {headers: {token : state.token}})
                .then(({ data }) => {
                  setState((state) => ({ ...state, totalStaff: data.length}));
                })
              });
            });
        })
        .catch((err) => console.log(err));
    }
  });

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
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
              <a className="nav-link active cursor-default" href="#">
                Beranda <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/userlist">
                User
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/stafflist">
                Petugas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reporthistory">
                Riwayat Aduan
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
        <div className="row justify-content-center space-between__admin-header">
          <div className="col-3 card width-card text-white bg-danger mb-3">
          <div className="card-body">
            <h1 className="text-center"><strong>{state.pendingReport}</strong></h1>
            <h2 className="text-center">Pending Report</h2>
          </div>
          </div>
        </div>
        <div className="row justify-content-center margin-top__5rem">

          <div className="col-3 card width-card border-info mb-3">
          <div className="card-body text-info">
            <h2 className="text-center"><strong>{state.totalReport}</strong></h2>
            <h3 className="text-center">Completed Report</h3>
          </div>
          </div>
          <div className="col-3 card margin-left__3rem width-card border-info mb-3">
          <div className="card-body text-info">
            <h2 className="text-center"><strong>{state.totalStaff}</strong></h2>
            <h3 className="text-center">Total Staff</h3>
          </div>
          </div>
          <div className="col-3 card margin-left__3rem width-card border-info mb-3">
          <div className="card-body text-info">
            <h2 className="text-center"><strong>{state.totalUser}</strong></h2>
            <h3 className="text-center">Total User</h3>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

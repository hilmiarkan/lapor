import { Form } from "../components/Form";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "./style.css";
import logo from "../assets/logo64.png";

export default function Login() {
  const [state, setState] = useState({
    content: "",
    status: "",
    laporan: [],
    respon: "",
    id_user: JSON.parse(sessionStorage.getItem("id")),
    token: JSON.parse(sessionStorage.getItem("token")),
    username: JSON.parse(sessionStorage.getItem("username")),
  });

  useEffect(() => {
      axios
        .get(`http://localhost:6809/report/user/${state.id_user}`, {headers: {token : state.token}})
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, laporan: data }));
          // window.location.assign('/report')
        })
        .catch((err) => console.log(err));
  }, [state.id_user]);

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
            <a className="nav-link" href="/report">
              Beranda
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active cursor-default" href="#">
              List Aduan <span className="sr-only">(current)</span>
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

      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="w-25">Isi Aduan</th>
              <th scope="col">Tanggal Dikirim</th>
              <th scope="col">Status</th>
              <th scope="col">Tanggapan</th>
            </tr>
          </thead>
          {state.laporan.map((element, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row" className="align-middle">{index+1}</th>
                <td className="w-25 align-middle">{element.content}</td>
                <td className="align-middle">{new Date(element.date_created).toDateString()}</td>
                <td className="align-middle">{element.status}</td>
                <td className="align-middle">{element.respon}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </Fragment>
  );
}

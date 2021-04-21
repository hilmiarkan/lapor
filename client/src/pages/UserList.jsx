import { Form, Input } from "../components/Form"; //eslint-disable-line
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import logo from "../assets/logo64.png";
import plus from "../assets/bx-plus-circle.svg"; //eslint-disable-line

export default function Admindex() {
  const [state, setState] = useState({
    user: [],
    token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/admin";
    } else {
      axios
        .get(`http://localhost:6809/user`, {headers: {token : state.token}})
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, user: data }));
          // window.location.assign('/report')
        })
        .catch((err) => console.log(err));
    }
  }, [state.id_user, state.token]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  const deleteAccount = (userId) => {
    axios
      .delete(`http://localhost:6809/admin/user/${userId}/delete`, {headers: {token : state.token}})
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  //eslint-disable-next-line
  const updateUser = (staffId, status) => {
    axios
      .put(`http://localhost:6809/staff/${staffId}/updateStaff`, {
        status,
        respon: state.content,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  //eslint-disable-next-line
  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
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
              <a className="nav-link" href="/admindex">
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active cursor-default" href="/">
                User <span className="sr-only">(current)</span>
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
        <div className="row margin-top__2rem justify-content-center">
          {state.user.map((element, index) => (
            <div className="card margin-card" key={index}>
              <div className="card-body">
                <h5 className="card-title">
                  {index + 1}.{" "}
                  {element.username.charAt(0).toUpperCase() +
                    element.username.slice(1)}
                </h5>
                <form>
                  <div className="form-row align-items-center">
                    <div className="form-group col-auto">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        className="form-control disabled"
                        id="email"
                        aria-describedby="emailHelp"
                        value={element.email}
                        disabled
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="password">Password</label>
                      <input
                        type="text"
                        className="form-control disabled"
                        id="password"
                        value={element.password}
                        disabled
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="username">Username</label>
                      <input
                        type="username"
                        className="form-control disabled"
                        id="username"
                        value={element.username}
                        disabled
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="telp">No Telepon</label>
                      <input
                        type="number"
                        className="form-control disabled"
                        id="telp"
                        value={element.telp}
                        disabled
                      />
                    </div>
                    <div className="userlist-button">

                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target={`#delModal${index}`}
                      >
                        Hapus
                      </button>
                    </div>

                    {state.user.map((element, index) => (
                      <div
                        key={index}
                      className="modal fade"
                      id={`delModal${index}`}
                      tabIndex="-1"
                      aria-labelledby="DelModalLabel"
                      aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="DelModalLabel">
                              Apakah anda yakin ingin menghapus akun ini?
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            Akun dan semua data aduan akun ini akan terhapus selama-lamanya!
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Kembali
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteAccount(element.id_user)}
                            >
                              Saya yakin, hapus akun
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

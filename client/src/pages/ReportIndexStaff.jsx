// eslint-disable-next-line
import { Form } from "../components/Form";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line
import $ from "jquery";
import "./style.css";
import logo from "../assets/logo64.png";

export default function Login() {
  const [state, setState] = useState({
    content: "",
    status: "",
    laporan: [],
    id_user: JSON.parse(sessionStorage.getItem("id")),
    token: JSON.parse(sessionStorage.getItem("tokenStaff")),
    username: JSON.parse(sessionStorage.getItem("username")),
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/loginstaff";
    } else {
      axios
        .get(`http://localhost:6809/report/user/pending`, {headers: {token : state.token}})
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, laporan: data }));
          // window.location.assign('/report')
        })
        .catch((err) => console.log(err));
    }
  }, [state.id_user]);

  const updateStatus = (reportId, status) => {
    axios
      .put(`http://localhost:6809/report/user/${reportId}/updateStatus`, 
      {
        status, respon: state.content, idStaff: state.id_user
      }, 

      {
        headers: {token : state.token}
      })

      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload();
  };

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
              <a className="nav-link" href="/staffindex">
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active cursor-default" href="#">
                Aduan <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reportongoing">
                Aduan dalam pengerjaan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reporthistorystaff">
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

      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="w-25">
                Isi Aduan
              </th>
              <th scope="col">Tanggal Dikirim</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {state.laporan.map((element, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="w-25 align-middle">{element.content}</td>
                <td className="align-middle">
                  {new Date(element.date_created).toDateString()}
                </td>
                <td className="align-middle">{element.status}</td>
                <td className="align-middle">
                  <div className="row container justify-content-center">
                    <button
                      className="btn btn-success btn-md"
                      data-toggle="modal"
                      data-target={`#approveModal${index}`}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-md offset-md-1"
                      data-toggle="modal"
                      data-target={`#rejectModal${index}`}
                    >
                      Reject
                    </button>

                    {state.laporan.map((element, index) => (
                      <div
                        key={index}
                        className="modal fade"
                        id={`approveModal${index}`}
                        tabIndex="-1"
                        aria-labelledby="ApproveModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="ApproveModalLabel">
                                Approve Aduan
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
                              Apakah anda yakin ingin meng-approve aduan ini?
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
                                className="btn btn-primary"
                                onClick={() =>
                                  updateStatus(element.id_report, "Work in progress")
                                }
                              >
                                Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
      
 {state.laporan.map((element, index) => (
   <div
     key={index}
     className="modal fade"
     id={`rejectModal${index}`}
     tabIndex="-1"
     aria-labelledby="RejectModalLabel"
     aria-hidden="true"
   >
     <div className="modal-dialog">
       <div className="modal-content">
         <div className="modal-header">
           <h5 className="modal-title" id="RejectModalLabel">
             Reject Aduan
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
           Berikan respon terkait aduan ini
           <textarea
             rows="7"
             className="form-control space-between__label-h3"
             name="content"
             placeholder="Komentar"
             onChange={handleChange}
             required
           ></textarea>
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
             onClick={() =>
               updateStatus(element.id_report, "Rejected")
             }
           >
             Reject
           </button>
         </div>
       </div>
     </div>
   </div>
 ))}

                  </div>
                </td>
              </tr>

            </tbody>
          ))}
        </table>
        
      </div>
    </Fragment>
  );
}

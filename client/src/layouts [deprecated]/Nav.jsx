import logo from "../assets/logo64.png";

export default function Nav() {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };
  return (
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
          <li className="nav-item ml-auto">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

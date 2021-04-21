import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import {
  Login,
  LoginStaff,
  Register,
  RegisterStaff,
  Report,
  Admin,
  Admindex,
  ReportIndex,
  ReportIndexStaff,
  ReportHistory,
  ReportHistoryStaff,
  UserList,
  StaffList,
  StaffIndex,
  ReportOngoing,
  EditUser
} from "./pages/";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ReportIndexStaff} path="/reportindexstaff" />
        <Route component={ReportHistory} path="/reporthistory" />
        <Route component={ReportHistoryStaff} path="/reporthistorystaff" />
        <Route component={ReportIndex} path="/reportindex" />
        <Route component={Admindex} path="/admindex" />
        <Route component={Admin} path="/admin" />
        <Route component={Report} path="/report" />
        <Route component={Register} path="/register" />
        <Route component={RegisterStaff} path="/registerstaff" />
        <Route component={Login} path="/login" />
        <Route component={LoginStaff} path="/loginstaff" />
        <Route component={UserList} path="/userlist" />
        <Route component={StaffList} path="/stafflist" />
        <Route component={StaffIndex} path="/staffindex" />
        <Route component={ReportOngoing} path="/reportongoing" />
        <Route component={EditUser} path="/edituser" />
        <Route component={Index} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

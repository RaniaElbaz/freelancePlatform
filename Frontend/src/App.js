import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./components/Auth/login/Login";
import Register from "./components/Auth/Register/Register";
import ActivateMail from "./components/Auth/Register/ActivateMail";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import AdminLogin from "./components/Auth/login/AdminLogin";
import AdminRegister from "./components/Auth/Register/AdminRegister";
import NotFound from "./components/NotFound/NotFound";
import ChangePassword from "./components/Auth/ChangePassword/ChangePassword";
import Admin from './pages/Admin/Admin';

function App() {
  /* To make protected component
   */

  let token = localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/register" exact component={AdminRegister} />
          <Route
            path="/activate-account/:userType?/:vToken?"
            exact
            component={ActivateMail}
          />
          <Route
            path="/forgot-password/:userType?/:rToken?"
            exact
            component={ForgotPassword}
          />
          <Route path="/change-password" exact component={ChangePassword} />
          {/* Protected (Private) Routes Here */}
          {/* {token ? "" : ""} */}

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

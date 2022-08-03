import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import ActivateMail from "./components/Register/ActivateMail";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import AdminLogin from "./components/login/AdminLogin";
import AdminRegister from "./components/Register/AdminRegister";
import NotFound from "./components/NotFound";
import ChangePassword from "./components/ChangePassword/ChangePassword";

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

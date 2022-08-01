import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import ActivateMail from "./components/Register/ActivateMail";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import AdminLogin from "./components/login/AdminLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin/register" exact component={Register} />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;

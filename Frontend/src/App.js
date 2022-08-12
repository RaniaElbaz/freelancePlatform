import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import "./App.css";

/************pages */
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const FreelancerProfile = React.lazy(() =>
  import("./pages/Profiles/FreelancerProfile")
);
const TeamProfile = React.lazy(() => import("./pages/Profiles/TeamProfile"));
const ClientProfile = React.lazy(() =>
  import("./pages/Profiles/ClientProfile")
);
const CompanyProfile = React.lazy(() =>
  import("./pages/Profiles/CompanyProfile")
);

function App() {
  return (
    <Router>
      <div className="bg-blue">
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/freelancer/:id" exact component={FreelancerProfile} />
            <Route path="/team/:id" exact component={TeamProfile} />
            <Route path="/client/:id" exact component={ClientProfile} />
            <Route path="/company/:id" exact component={CompanyProfile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

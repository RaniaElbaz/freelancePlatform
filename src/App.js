import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AllMeetups from "./pages/AllMeetups";
import Favourites from "./pages/Favourites";
import NewMeetups from "./pages/NewMeetups";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={AllMeetups} />
        <Route path="/project" exact component={Projects} />
        <Route path="/project/:id" component={Project} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProjectPrivate from "./pages/ProjectPrivate";
import ProjectProposal from "./pages/ProjectProposal";
import UpdateProject from "./pages/UpdateProject";
import AddProject from "./pages/AddProject";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

function App() {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY2MDAzNDQ4MywiZXhwIjoxNjYwMDM4MDgzfQ.w-rlqtMPR9a3cbmkvTA-1OmFMCxdDF3gjFIYyrty1jU"
  );
  localStorage.setItem("username", "Samaa Hamdi");
  localStorage.setItem("image", "");
  localStorage.setItem("id", "1");
  localStorage.setItem("role", "client");
  return (
    <Layout>
      <Switch>
        <Route path="/project" exact component={Projects} />
        <Route path="/project/:id/private" exact component={ProjectPrivate} />
        <Route path="/project/:id/update" exact component={UpdateProject} />
        <Route path="/project/:id/proposal" exact component={ProjectProposal} />
        <Route path="/project/add" exact component={AddProject} />
        <Route path="/project/:id" exact component={Project} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

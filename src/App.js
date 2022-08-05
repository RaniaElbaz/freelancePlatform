import { Route, Switch } from "react-router-dom";
// import { useState } from "react";

import Layout from "./components/Layout/Layout";
import AllMeetups from "./pages/AllMeetups";
import ProjectPrivate from "./pages/ProjectPrivate";
import ProjectProposal from "./pages/ProjectProposal";
// import SavedProjects from "./pages/SavedProjects";
// import RecommendedProjects from "./pages/RecommendedProjects";
import UpdateProject from "./pages/UpdateProject";
// import DeleteProject from "./pages/DeleteProject";
import AddProject from "./pages/AddProject";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

function App() {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE2NTk3MTM4MDgsImV4cCI6MTY1OTcxNzQwOH0.Ou2mhRPnDohaewAPNMXycrZ9Stm7GUmZd6e3aL-JNxs"
  );
  localStorage.setItem("username", "Samaa Hamdi");
  localStorage.setItem("image", "");
  localStorage.setItem("id", "1");
  localStorage.setItem("role", "freelancer");
  // const savedProjects = useState([]);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={AllMeetups} />
        <Route path="/project" exact component={Projects} />
        <Route path="/project/:id/private" exact component={ProjectPrivate} />
        <Route path="/project/:id/update" exact component={UpdateProject} />
        {/* <Route path="/project/:id/delete" exact component={DeleteProject} /> */}
        <Route path="/project/proposal" exact component={ProjectProposal} />
        {/* <Route
          path="/project/recommended"
          exact
          component={RecommendedProjects}
        /> */}
        {/* <Route path="/project/saved" exact component={SavedProjects} /> */}
        <Route path="/project/add" exact component={AddProject} />
        <Route path="/project/:id" exact component={Project} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProjectPrivate from "./pages/FindProjects/ProjectPrivate";
import ProjectProposal from "./pages/FindProjects/ProjectProposal";
import UpdateProject from "./pages/FindProjects/UpdateProject";
import AddProject from "./pages/FindProjects/AddProject";
import NotFound from "./pages/FindProjects/NotFound";
import Projects from "./pages/FindProjects/Projects";
import Project from "./pages/FindProjects/Project";
import TestimonialForm from "./components/FindProjects/TestimonialForm/TestimonialForm";

function App() {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE2NjAzMDEyNjgsImV4cCI6MTY2MDMwNDg2OH0.z6uBzM-Cn139mUx6thWKVMi_Vk2JveJPWMNFzCsOa54"
  );
  localStorage.setItem("username", "Salma Hamdi");
  localStorage.setItem("image", "");
  localStorage.setItem("id", "2");
  localStorage.setItem("role", "team");
  return (
    <Layout>
      <Switch>
        <Route path="/project" exact component={Projects} />
        <Route path="/project/:id/private" exact component={ProjectPrivate} />
        <Route path="/project/:id/update" exact component={UpdateProject} />
        <Route path="/project/:id/proposal" exact component={ProjectProposal} />
        <Route path="/project/:id/finish" exact component={TestimonialForm} />
        <Route path="/project/add" exact component={AddProject} />
        <Route path="/project/:id" exact component={Project} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

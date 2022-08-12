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

import Product from "./pages/Store/Product";
import ProductDetails from "./pages/Store/ProductDetails";
import CreateProduct from "./pages/Store/CreateProduct";
import UpdateProduct from "./pages/Store/UpdateProduct";

function App() {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYwMzExMzUzLCJleHAiOjE2NjAzMTQ5NTN9.DD8Fsbb-e7aM0yUrVo-xYoq9Qt0S1D-3zTeWKBQ17SM"
  );
  localStorage.setItem("username", "Salma Hamdi");
  localStorage.setItem("id", "1");
  localStorage.setItem("role", "freelancer");
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
        <Route path="/product" exact component={Product} />
        <Route path="/product/details/:id" exact component={ProductDetails} />
        <Route path="/product/create" exact component={CreateProduct} />
        <Route path="/product/update/:id" exact component={UpdateProduct} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

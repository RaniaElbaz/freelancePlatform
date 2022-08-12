import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";
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
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo"
  );
  localStorage.setItem("username", "Salma Hamdi");
  localStorage.setItem("id", "1");
  localStorage.setItem("role", "freelancer");
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/freelancer/:id" exact component={FreelancerProfile} />
          <Route path="/team/:id" exact component={TeamProfile} />
          <Route path="/client/:id" exact component={ClientProfile} />
          <Route path="/company/:id" exact component={CompanyProfile} />
          <Route path="/project" exact component={Projects} />
          <Route path="/project/:id/private" exact component={ProjectPrivate} />
          <Route path="/project/:id/update" exact component={UpdateProject} />
          <Route
            path="/project/:id/proposal"
            exact
            component={ProjectProposal}
          />
          <Route path="/project/:id/finish" exact component={TestimonialForm} />
          <Route path="/project/add" exact component={AddProject} />
          <Route path="/project/:id" exact component={Project} />
          <Route path="/product" exact component={Product} />
          <Route path="/product/details/:id" exact component={ProductDetails} />
          <Route path="/product/create" exact component={CreateProduct} />
          <Route path="/product/update/:id" exact component={UpdateProduct} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;

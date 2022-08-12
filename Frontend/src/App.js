import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Product from "./pages/Store/Product";
import ProductDetails from "./pages/Store/ProductDetails";
import CreateProduct from "./pages/Store/CreateProduct";
import UpdateProduct from "./pages/Store/UpdateProduct";

function App() {
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYwMzA1MzQ0LCJleHAiOjE2NjAzMDg5NDR9.NWNEhWm9aLyG4YVy3P7_82uRzVYZHpBIF6uBvcrGXcQ");
  localStorage.setItem("id", 1);
  localStorage.setItem("role", "freelancer");
  return (
    <Router>
      

      <Switch>
        <Route path={"/product"} exact component={Product} />
        <Route path={"/product/details/:id"} exact component={ProductDetails} />
        <Route path={"/product/create"} exact component={CreateProduct} />
        <Route path={"/product/update/:id"} exact component={UpdateProduct} />
      </Switch>
    </Router>
  );
}

export default App;

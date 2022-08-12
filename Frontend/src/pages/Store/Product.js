import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "../../components/Store/cards/ProductsCard";
import { Link } from "react-router-dom";

const role = localStorage.getItem("role");

export default function Product() {
  const [products, setproduct] = useState([]);
  const [isAuthoriztion, setAuthorization] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/")
      

      .then((res) => {
        setproduct(res.data);
      })
      .catch((err) => console.log(err));
    if (role === "freelancer" || role === "team" ) {
      setAuthorization(true);
    }
  }, []);

  return (
    <div className="container album py-5" style={{width:"62rem"}}>
      {isAuthoriztion && (
        <Link to="/product/create">
          <button  style={{borderRadius:'0.375rem'}} className="  mb-2  py-1">Create One!</button>
        </Link>
      )}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map((product, index) => {
          return <ProductsCard key={index} product={product} />;
        })}
      </div>
    </div>
  );
}

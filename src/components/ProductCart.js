import React from "react";
import { Link } from "react-router-dom";

const ProductCart = ({ values }) => {
  const { image, location, description, id } = values;
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{ width: "100%", height: "180px" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{description}</h5>
          <p className="card-text">{location}</p>
          <Link to={`/${id}`}>
            <button className="btn btn-primary">detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;

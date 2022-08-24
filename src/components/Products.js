import React, { useContext, useEffect, useState } from "react";
import { productProvider } from "../context/ProductContext";
import ProductCart from "./ProductCart";
import styled from "./Products.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { paginate } from "../helper/function";

var _ = require("lodash");

const Products = () => {
  const { product: products } = useContext(productProvider);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizetPage] = useState(8);

  const Number = Math.ceil(products.length / sizePage);
  const paginateProduct = paginate(products, currentPage, sizePage);

  const pageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className={styled.cart}>
        {paginateProduct.map((item) => (
          <ProductCart key={item.id} values={item} />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <div className=" rounded-3 bg-light  w-auto d-flex justify-content-center p-2">
          <Stack spacing={2}>
            <Pagination count={Number} color="primary" onChange={pageChange} />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Products;

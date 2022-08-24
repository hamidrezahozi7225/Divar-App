import React, { useState, useEffect, createContext } from "react";
import { getProducts } from "../api/productApi";

export const productProvider = createContext();

const ProductContext = (props) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const ProductApi = async () => {
      setProduct(await getProducts());
    };
    ProductApi();
  }, []);

  return (
    <productProvider.Provider value={{ product, setProduct }}>
      {props.children}
    </productProvider.Provider>
  );
};

export default ProductContext;

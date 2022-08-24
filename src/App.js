import React, { useState } from "react";
import ProductContext from "./context/ProductContext";
import Products from "./components/Products";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Location from "./components/Location";
import UsersContext from "./context/UsersContext";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [switchTheme, setSwitchTheme] = useState(false);

  const handleTheme = () => {
    setSwitchTheme(!switchTheme);
  };

  return (
    <ProductContext>
      <UsersContext>
        <Header handleTheme={handleTheme} switchTheme={switchTheme} />
        <div className={switchTheme ? "app app-dark" : "app app-light"}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/addProduct" element={<AddProduct />} />
            </Routes>
          </div>
        </div>
      </UsersContext>
    </ProductContext>
  );
};

export default App;

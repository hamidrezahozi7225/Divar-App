import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productProvider } from "../context/ProductContext";
import styled from "./ProductDetail.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DelProduct, UpdateProduct } from "../api/productApi";
import Location from "./Location";

const ProductDetails = () => {
  const [open, setOpen] = React.useState(false);
  const { product: products, setProduct } = useContext(productProvider);
  const data = useParams();
  const product = products[products.findIndex((item) => item.id == data.id)];
  const { image, locationHome, phoneNumber, location, description, id } =
    product;

  const [descript, setDescript] = useState(description);
  const [phone, setPhone] = useState(phoneNumber);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = (id) => {
    DelProduct(id);
    navigate("/");
    const p = products.filter((item) => item.id !== id);
    setProduct(p);
    // history.push("/");
  };
  const handleClose = (id, descript, phone) => {
    setOpen(false);
    UpdateProduct(id, descript, phone);
    setProduct((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return { ...obj, description: descript, phoneNumber: phone };
        }
        return obj;
      })
    );
    navigate("/");
    console.log(description);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className={styled.detailcart}>
          <div className={styled.detail}>
            <img src={image} alt={description} />
            <div>
              <h2>{description}</h2>
              <p>{phoneNumber}</p>
              <p>{locationHome}</p>
              <Location />
              <div className="d-flex  justify-content-between mt-3">
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  color="secondary"
                >
                  ویرایش
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(id)}
                  color="error"
                >
                  حذف
                </Button>
              </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>update product</DialogTitle>
              <DialogContent>
                <div className="mt-2">
                  <label>description</label>
                  <input
                    type="text"
                    value={descript}
                    onChange={(e) => setDescript(e.target.value)}
                    className="w-100"
                  />
                </div>
                <div className="mt-2">
                  <label>phoneNumber</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-100"
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => handleClose(id, descript, phone)}
                >
                  ثبت
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

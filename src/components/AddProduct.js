import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postProduct } from "../api/productApi";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { productProvider } from "../context/ProductContext";
import Location from "./Location";

const theme = createTheme();

const AddProduct = () => {
  const previewMethodsRef = useRef();
  const [previews, setPreviews] = useState([]);
  const [images, setImages] = useState();
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    image: "",
    description: "",
    location: "",
    phoneNumber: "",
  });
  const { product, setProduct } = useContext(productProvider);
  const finishid = product.length;

  const onPreviewsChanged = useCallback((previews) => {
    setPreviews(previews);
    setImages(previews.map((item) => item.url));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const descript = data.get("description");
    const locat = data.get("location");
    const phone = data.get("phoneNumber");
    // console.log(product);
    setProducts({
      image: images[0],
      description: descript,
      location: locat,
      phoneNumber: phone,
      id: finishid + 1,
    });

    // navigate("/");
  };
  useEffect(() => {
    console.log(products);
    if (products.description && products.location && products.phoneNumber) {
      postProduct(products);
      navigate("/");
      setProduct([...product, products]);
    }
  }, [products]);

  return (
    <div className="add">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Product
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Uploady destination={{ url: process.env.UPLOAD_URL }}>
                <UploadButton />
                <UploadPreview
                  rememberPreviousBatches
                  previewMethodsRef={previewMethodsRef}
                  onPreviewsChanged={onPreviewsChanged}
                />
              </Uploady>
              <Location />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="description"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="location"
                label="location"
                type="location"
                id="location"
                autoComplete="current-location"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="phoneNumber"
                type="phoneNumber"
                id="phoneNumber"
                autoComplete="current-phoneNumber"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddProduct;

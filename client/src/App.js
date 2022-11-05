import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";

import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import { TextField } from "@mui/material";
import ProductCard from "./components/ProductCard";

import axios from "axios";
import Loader from "./components/Loader";
import AddProductModal from "./components/AddProductModal";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";

export default function App() {
  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchString, setSearchString] = useState("");

  const getProducts = async () => {
    const res = await axios.get("/api/cribs");
    setProducts(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (searchString != "") {
      searchProducts();
    } else {
      getProducts();
    }
  }, [searchString]);

  const searchProducts = () => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setFiltered(filtered);
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
          },
        }}
      />

      <Container>
        <ToastContainer />
        <Grid container sx={{ mt: 10, mb: 5 }}>
          <Grid xs={8}>
            <TextField
              id="outlined-basic"
              label="Search Crib...."
              placeholder="Search..."
              variant="outlined"
              fullWidth
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Grid>
          <Grid xs={4} display="flex" sx={{ pl: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ fontSize: "16px" }}
              onClick={() => setOpen(!open)}
            >
              Add Crib
            </Button>
          </Grid>
        </Grid>

        <Grid container sx={{ mb: 5 }}>
          {loading ? (
            <Loader />
          ) : searchString != "" ? (
            filtered.map((item) => (
              <Grid key={item.id} item xs={6} md={4} sx={{ mb: 6 }}>
                <ProductCard item={item} getProducts={getProducts} />
              </Grid>
            ))
          ) : products.length > 0 ? (
            products.map((item) => (
              <Grid key={item.id} item xs={6} md={4} sx={{ mb: 6 }}>
                <ProductCard item={item} getProducts={getProducts} />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "150px",
              }}
            >
              <Box
                component="img"
                sx={{ width: 200, height: 200 }}
                src="/assets/noorder.svg"
              />
              <h3 style={{ fontWeight: "bold" }}>No Cribs Found</h3>
            </Grid>
          )}
        </Grid>
      </Container>

      <AddProductModal
        open={open}
        setOpen={setOpen}
        getProducts={getProducts}
      />
    </React.Fragment>
  );
}

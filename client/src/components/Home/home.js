import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Offers from "../offers";
import ProductCard from "../Product/ProductCard";
import apiClient from "../../apis/api-client";
import urls from "../../apis/urls";

export default function Home() {
  const [categoryProducts, setcategoryProducts] = useState([]);

  useEffect(() => {
    apiClient
      .get(urls.product.get)
      .then((response) => {
        console.log(response);
        setcategoryProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box
      marginLeft={"100px"}
      marginRight={"100px"}
      marginTop={"10px"}
      padding={"24px"}
    >
      <Grid container>
        <Offers />
      </Grid>
      <Grid container spacing={3} marginTop={"20px"}>
        {categoryProducts &&
          categoryProducts.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <Grid item lg={12}>
                <Typography
                  variant="h5"
                  sx={{ backgroundColor: "#1976d2", color: "white", padding: "10px"}}
                >
                  {" "}
                  {category.categoryName}
                </Typography>
              </Grid>
              {category.products.map((item, itemIndex) => (
                <Grid item key={itemIndex}>
                  <ProductCard
                    productId={item.productId}
                    category={item.category}
                    itemName={item.name}
                    price={item.price}
                    image={item.image}
                  />
                </Grid>
              ))}
            </React.Fragment>
          ))}
      </Grid>
    </Box>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import apiClient from "../../apis/api-client";
import urls from "../../apis/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Store, { IdContext } from "../BuyNow/Store.js";

export default function MediaCard({
  productId,
  itemName,
  category,
  newPrice,
  oldPrice,
  image,
}) {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  const navigate = useNavigate();
  const { id, setId } = React.useContext(IdContext);

  const buyNow = (id) => {
    console.log(token, userId);
    setId(id);
    navigate("/buyNow/" + id);
  };
  const addToCart = (id) => {
    console.log(token, userId);
    apiClient
      .post(urls.cart.create.replace("{id}", id), null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          toast("Item Added to Cart Successfully", { type: "success" });
        } else {
          toast.info("Failed to Add Item to Cart");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card sx={{ width: 235 }}>
        <Link
          to={`/product/${productId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardMedia
            sx={{
              height: 150,
              // paddingTop: "100%", // 1:1 Aspect Ratio
              backgroundSize: "contain",
            }}
            image={image}
            title={itemName}
          />
        </Link>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link
              to={{
                pathname: `/product/${productId}`,
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {itemName}
            </Link>
          </Typography>

          <Typography
            variant="h6"
            color="text.primary"
            // fontWeight="bold"
            style={{ display: "inline-block" }}
            marginRight={1}
          >
            ₹{newPrice}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            // fontWeight="bold"
            style={{ display: "inline-block", textDecoration: "line-through" }}
          >
            ₹{oldPrice}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            // fontWeight="bold"
            style={{ color: "red" }}
          >
            {Math.floor(((oldPrice - newPrice) / oldPrice) * 100)}% off
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {category}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="small"
            onClick={() => {
              if (token) {
                buyNow(productId);
              } else {
                toast.info("Please log in to buy");
              }
            }}
          >
            Buy Now
          </Button>
          <Button
            onClick={() => {
              if (token) {
                addToCart(productId);
              } else {
                toast.info("Please log in to add to cart");
              }
            }}
            size="small"
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <ToastContainer />
    </>
  );
}

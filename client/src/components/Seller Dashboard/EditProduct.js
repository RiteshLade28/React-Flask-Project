import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiClient from "../../apis/api-client";
import urls from "../../apis/urls";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function AddProduct() {
  const navigate = new useNavigate();

  const [categories, setCategories] = useState([]);
  const [sellItem, setSellItem] = useState();

  const [name, setName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");

  const [images, setImages] = useState([]);
  const [isButtonMoved, setIsButtonMoved] = useState(false);

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    const newImages = [];

    for (let i = 0; i < fileList.length && images.length < 10; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      reader.onload = () => {
        newImages.push(reader.result);

        if (i === fileList.length - 1 || newImages.length === 10) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    const id = new URL(window.location.href).pathname.split("/")[3];
    const token = Cookies.get("token");
    console.log(id);

    apiClient
      .get(urls.sellerProducts.get.replace("{id}", id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setName(response.data.product.name);
        setOldPrice(response.data.product.oldPrice);
        setNewPrice(response.data.product.newPrice);
        setDescription(response.data.product.description);
        setStock(response.data.product.stock);
        setDiscount(response.data.product.discount);
        setImages(response.data.product.images);
        setSellItem(response.data.product.categoryId);
      })
      .catch((error) => {
        console.log(error);
      });

    apiClient
      .get(urls.category.get)
      .then((response) => {
        console.log(response.data.categories);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditProduct = (e) => {
    e.preventDefault();
    const id = new URL(window.location.href).pathname.split("/")[3];
    const token = Cookies.get("token");
    console.log(token);
    apiClient
      .patch(
        urls.sellerProducts.update.replace("{id}", id),
        {
          itemName: name,
          oldPrice: oldPrice,
          newPrice: newPrice,
          description: description,
          stock: stock,
          discount: discount,
          images: images,
          categoryId: sellItem,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Product Updated Successfully");
        setImages([]);
        setName("");
        setOldPrice("");
        setNewPrice("");
        setDescription("");
        setStock("");
        setDiscount("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Product Not Updated");
      });
    // navigate("/seller-dashboard");
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          marginBottom: "20px",
          // marginLeft: "80px",
          marginTop: "80px",
        }}
      >
        Edit Product
      </Typography>

      <Grid
        container
        sx={{
          padding: "0px 0px 0px 90px",
        }}
      >
        <Grid item lg={5}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Add Product Images
          </Typography>
          <Typography component="div" variant="body1">
            Max 10 images can be uploaded for a product
          </Typography>
          <Grid container spacing={2} paddingTop={"20px"}>
            {images.map((image, index) => (
              <Grid
                item
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: "125px",
                    height: "100px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <IconButton
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleImageDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
            {images.length < 10 && (
              <Grid item>
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  style={{ display: "none", height: "100px" }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="primary"
                    component="span"
                    sx={{
                      height: "100px",
                      width: "150px",
                      border: "1px solid black",
                      ...(isButtonMoved && { marginLeft: "auto" }),
                    }}
                  >
                    +
                  </Button>
                </label>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                width: "780px",
                display: "flex",
                flexDirection: "column",
                // paddingTop: "50px",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5" fontWeight="bold">
                Edit Product
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleEditProduct}
                sx={{ mt: 3, width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="sellItem">Category</InputLabel>
                        <Select
                          labelId="sellItem"
                          id="sellItem"
                          value={
                            sellItem ||
                            (categories.length > 0 ? categories[0].id : "")
                          }
                          label="Category"
                          onChange={(e) => {
                            setSellItem(e.target.value);
                          }}
                        >
                          {categories?.map((category) => (
                            <MenuItem value={category.id} key={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      id="oldPrice"
                      label="Old Price"
                      name="oldPrice"
                      autoComplete="oldPrice"
                      value={oldPrice}
                      onChange={(e) => setOldPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      id="newPrice"
                      label="New Price"
                      name="newPrice"
                      autoComplete="newPrice"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      id="stock"
                      label="Stock"
                      name="stock"
                      autoComplete="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="discription"
                      label="Discription"
                      name="discription"
                      autoComplete="discription"
                      value={description}
                      InputProps={{
                        style: { height: "200px", margin: "dense" },
                      }}
                      multiline
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit Product
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}

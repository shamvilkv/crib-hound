import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import PlaceIcon from "@mui/icons-material/Place";
import { toast } from "react-toastify";
import axios from "axios";
import EditProductModal from "./EditProductModal";

export default function ProductCard({ item, getProducts }) {
  const { name, location, imageUrl, _id } = item;

  const [edit, setEdit] = React.useState(false);

  const deleteCrib = async (id) => {
    const res = await axios.delete(`/api/cribs/${id}`);
    if (res.data.success) {
      getProducts();
      toast("Crib Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "auto",
        margin: "15px",
        boxShadow: "0px 4px 20px 5px rgba(0, 0, 0, 0.15)",
        borderRadius: "30px",
      }}
    >
      <CardActionArea onClick={() => setEdit(!edit)}>
        <Button
          sx={{ top: 10, right: 10, position: "absolute" }}
          onClick={(e) => deleteCrib(_id)}
        >
          <DeleteTwoToneIcon color="error" sx={{ fontSize: "25px" }} />
        </Button>

        <CardMedia
          sx={{
            objectFit: "cover",
          }}
          component="img"
          src={imageUrl}
          width="300"
          height={"300"}
          alt="Crib Hound"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#212121", fontWeight: 700, fontSize: "20px" }}
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="small"
            component="div"
            sx={{ color: "#4d4d4d", fontWeight: 500, fontSize: "16px" }}
          >
            {" "}
            <PlaceIcon />
            {location}
          </Typography>
        </CardContent>
      </CardActionArea>

      <EditProductModal
        open={edit}
        setOpen={setEdit}
        getProducts={getProducts}
        id={_id}
      />
    </Card>
  );
}

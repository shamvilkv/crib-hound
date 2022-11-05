import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProductModal({ open, setOpen, getProducts, id }) {
  React.useEffect(() => {
    getProduct(id);
  }, []);

  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateProduct = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/api/cribs/${product?._id}`, product);
    if (res.data.success) {
      setOpen(!open);
      getProducts();
      toast("Crib Updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
    }
  };

  const getProduct = async () => {
    const res = await axios.get(`/api/cribs/${id}`);
    setProduct(res.data.crib);

    setLoading(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1} sx={{ fontWeight: "600" }}>
                Edit Crib
              </Box>
              <Box>
                <Button onClick={() => handleClose()}>
                  <CloseIcon sx={{ fontSize: "18px" }} />
                </Button>
              </Box>
            </Box>
          </DialogTitle>

          {loading ? (
            <Loader />
          ) : (
            <Box
              display="flex"
              flexDirection={"column"}
              rowGap={3}
              sx={{ mt: 3 }}
            >
              <TextField
                value={product?.name}
                fullWidth
                name="name"
                placeholder="Enter Crib Name"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <TextField
                value={product?.imageUrl}
                fullWidth
                name="imageUrl"
                placeholder="Enter Image URL"
                onChange={(e) =>
                  setProduct({ ...product, imageUrl: e.target.value })
                }
              />
              <TextField
                value={product?.location}
                fullWidth
                name="location"
                placeholder="Enter Location"
                onChange={(e) =>
                  setProduct({ ...product, location: e.target.value })
                }
              />

              <Button
                onClick={(e) => updateProduct(e)}
                type="submit"
                variant="contained"
                fullWidth
              >
                Update
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}

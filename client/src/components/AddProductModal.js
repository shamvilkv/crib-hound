import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

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

export default function AddProductModal({
  open,
  setOpen,
  getProducts,
  isEdit,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors: errors },
    setValue,
    reset,
  } = useForm();

  const addProducts = async (data, e) => {
    const res = await axios.post("/api/cribs", data);
    if (res.data.success) {
      setOpen(!open);
      reset();
      e.target.reset();
      getProducts();
      toast("Crib Added", {
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
                Add Crib
              </Box>
              <Box>
                <Button onClick={() => handleClose()}>
                  <CloseIcon sx={{ fontSize: "18px" }} />
                </Button>
              </Box>
            </Box>
          </DialogTitle>

          <form onSubmit={handleSubmit(addProducts)}>
            <Box
              display="flex"
              flexDirection={"column"}
              rowGap={3}
              sx={{ mt: 3 }}
            >
              <TextField
                {...register("name", { required: true })}
                fullWidth
                name="name"
                error={errors.name}
                placeholder="Enter Crib Name"
              />
              <TextField
                {...register("imageUrl", { required: true })}
                fullWidth
                name="imageUrl"
                error={errors.imageUrl}
                placeholder="Enter Image URL"
              />
              <TextField
                {...register("location")}
                fullWidth
                name="location"
                error={errors.location}
                placeholder="Enter Location"
              />

              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

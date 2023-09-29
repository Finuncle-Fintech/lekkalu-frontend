import React, { useState, useEffect, useContext } from "react";
import { Context } from "provider/Provider";
import Backdrop from "@mui/material/Backdrop";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, TextField, Button, Typography } from "@mui/material";
import Loading from "./Loading";

export default function SimpleBackdrop(props) {
  const [boxWidth, setBoxWidth] = useState("40vw");
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    name: "",
    purchase_value: "",
    sell_value: "",
    purchase_date: "",
    sell_date: "",
    depreciation_percent: "",
    depreciation_frequency: "",
    init_dep: "",
    market_value: "",
  });

  const { addAssetRequest, editAssetRequest } = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const data = {
    name: "houseeee",
    purchase_value: "80000.00",
    sell_value: "0.00",
    purchase_date: "2021-10-01",
    sell_date: "2023-04-09",
    depreciation_percent: "1.000000",
    depreciation_frequency: 2592000,
    init_dep: "0.750000",
    market_value: "769417.39",
    user: 2,
    type: 1,
    tags: [],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      await addAssetRequest(data);
      setOpen(false);
      props.setForm(false);
      props.handleRequestForm();
    } catch (error) {
      console.error("Error adding asset:", error);
      setOpen(false);
    }
  };

  useEffect(() => {
    const updateBoxWidth = () => {
      if (window.innerWidth <= 768) {
        setBoxWidth("80vw");
      } else if (window.innerWidth <= 1000) {
        setBoxWidth("70vw");
      } else if (window.innerWidth <= 480) {
        setBoxWidth("90vw");
      } else {
        setBoxWidth("55vw");
      }
    };
    window.addEventListener("resize", updateBoxWidth);
    updateBoxWidth();
    return () => {
      window.removeEventListener("resize", updateBoxWidth);
    };
  }, []);

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      {open && <Loading open={open} />}
      <Backdrop
        sx={{ color: "#fff", zIndex: 1000 }}
        open={props.showForm}
        onClick={props.handleRequestForm}
      >
        <Box
          sx={{
            width: boxWidth,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
            overflowY: "auto",
          }}
          onClick={handleBoxClick}
        >
          <Box
            sx={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              onClick={props.handleRequestForm}
              sx={{ margin: "15px 30px 15px 15px" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>{" "}
          <Box
            sx={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              Add Assets
            </Typography>
          </Box>
          <Box sx={{ padding: "5rem" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                // required
                fullWidth
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Purchase Value"
                name="purchase_value"
                type="number"
                value={formData.purchase_value}
                onChange={handleChange}
                // required
                fullWidth
                sx={{ margin: "1em 0 " }}
              />

              <TextField
                label="Sell Value"
                name="sell_value"
                type="number"
                value={formData.sell_value}
                onChange={handleChange}
                //required
                fullWidth
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Purchase Date"
                name="purchase_date"
                type="date"
                value={formData.purchase_date}
                onChange={handleChange}
                fullWidth
                // required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Sell Date"
                name="sell_date"
                type="date"
                value={formData.sell_date}
                onChange={handleChange}
                fullWidth
                //  required
                height="50px"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Depreciation Percent"
                name="depreciation_percent"
                type="number"
                value={formData.depreciation_percent}
                onChange={handleChange}
                fullWidth
                // required
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Depreciation Frequency"
                name="depreciation_frequency"
                type="number"
                value={formData.depreciation_frequency}
                onChange={handleChange}
                fullWidth
                //  required
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Initial Depreciation"
                name="init_dep"
                type="number"
                value={formData.init_dep}
                onChange={handleChange}
                fullWidth
                //  required
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Market Value"
                name="market_value"
                type="number"
                value={formData.market_value}
                onChange={handleChange}
                fullWidth
                // required
                sx={{ margin: "1em 0 " }}
              />

              <TextField
                label="User"
                name="user"
                type="number"
                value={formData.user}
                onChange={handleChange}
                fullWidth
                sx={{ margin: "1em 0 " }}
                // required
              />
              <TextField
                label="Type"
                name="type"
                type="number"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                sx={{ margin: "1em 0 " }}
                //required
              />

              {/* <TextField
                label="Tags (comma-separated)"
                name="tags"
                value={formData.tag}
                onChange={handleChange}
                fullWidth
              /> */}

              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { Context } from "provider/Provider";
import Backdrop from "@mui/material/Backdrop";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import Loading from "./Loading";
import jwt_decode from "jwt-decode";

export default function SimpleBackdrop(props) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    name: "",
    purchase_value: "",
    sell_value: "",
    purchase_date: "",
    sell_date: "",
    year: "1",
    month: "1",
    depreciation_percent: "",
    depreciation_frequency: "",
    market_value: "",
    user: "",
    type: "1",
  });

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const years = Array.from({ length: 40 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const { addAssetRequest, editAssetRequest, fetchAssetById, authToken } =
    useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleYearChange = (event) => {
    setFormData({
      ...formData,
      year: event.target.value,
    });
  };
  const handleMonthChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      const userId = decodedToken.user_id;
      setFormData({
        ...formData,
        user: userId,
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (props.title === "Edit") {
        try {
          const assetData = await fetchAssetById(props.id);

          setFormData({
            ...formData,
            name: assetData.name,
            purchase_value: assetData.purchase_value,
            sell_value: assetData.sell_value || "",
            purchase_date: assetData.purchase_date,
            sell_date: assetData.sell_date || "",
            depreciation_percent: assetData.depreciation_percent,
            depreciation_frequency: assetData.depreciation_frequency,
            market_value: assetData.market_value,
            user: assetData.user,
            type: assetData.type,
          });
          setOpen(false);
        } catch (error) {
          console.error("Error fetching asset data:", error);
          setOpen(false);
        }
      }
    };

    fetchData();
  }, [props.id, props.title]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);

    const filteredData = {};

    for (const key in formData) {
      if (formData[key] !== "") {
        filteredData[key] = formData[key];
      }
    }

    if (props.title === "Add") {
      try {
        await addAssetRequest(filteredData);
        setOpen(false);
        props.setForm(false);
        props.handleRequestForm();
      } catch (error) {
        console.error("Error adding asset:", error);
        setOpen(false);
      }
    } else if (props.title === "Edit") {
      try {
        await editAssetRequest(props.id, filteredData);
        setOpen(false);
        props.handleRequestForm();
      } catch (error) {
        console.error("Error editing asset:", error);
        setOpen(false);
      }
    }
  };

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
            width: "30em",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            maxHeight: "95%",
            overflowY: "auto",
            borderRadius: "10px",
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
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {props.title} Asset
            </Typography>
          </Box>
          <Box sx={{ padding: "1rem 5rem 5rem 5rem" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Purchase Value"
                name="purchase_value"
                type="number"
                value={formData.purchase_value}
                onChange={handleChange}
                required
                fullWidth
                sx={{ margin: "1em 0 " }}
              />

              <TextField
                label="Sell Value"
                name="sell_value"
                type="number"
                value={formData.sell_value}
                onChange={handleChange}
                // required
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
                required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: "1em 0 " }}
                InputProps={{
                  sx: { height: "56px" },
                }}
              />
              <TextField
                label="Sell Date"
                name="sell_date"
                type="date"
                value={formData.sell_date}
                onChange={handleChange}
                fullWidth
                //required
                height="50px"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: "1em 0 " }}
                InputProps={{
                  sx: { height: "56px" },
                }}
              />
              <TextField
                label="Select Month"
                name="month"
                select
                value={formData.month}
                onChange={handleMonthChange}
                fullWidth
                required
                sx={{ margin: "1em 0 " }}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Select Year"
                name="year"
                select
                value={formData.year}
                onChange={handleYearChange}
                fullWidth
                required
                sx={{ margin: "1em 0 " }}
              >
                {years.map((year) => (
                  <MenuItem key={year.value} value={year.value}>
                    {year.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Depreciation Percent"
                name="depreciation_percent"
                type="number"
                value={formData.depreciation_percent}
                onChange={handleChange}
                fullWidth
                required
                sx={{ margin: "1em 0 " }}
              />
              <TextField
                label="Depreciation Frequency"
                name="depreciation_frequency"
                type="number"
                value={formData.depreciation_frequency}
                onChange={handleChange}
                fullWidth
                required
                sx={{ margin: "1em 0 " }}
              />

              <TextField
                label="Market Value"
                name="market_value"
                type="number"
                value={formData.market_value}
                onChange={handleChange}
                fullWidth
                required
                sx={{ margin: "1em 0 " }}
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

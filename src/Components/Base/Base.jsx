import React, { useState } from "react";
import styles from "./base.module.css";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import { useCommonContext } from "../../State Management/ContextApi";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#352f49",
  boxShadow: "0 0 5px 5px #5a5275",
  p: 4,
};

const Base = ({ children }) => {
  const navigate = useNavigate();
  const { addTask } = useCommonContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    status: "to do",
    description: "",
  });

  //   handling model
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logoutFunction = () => {
    localStorage.removeItem("userToken");
    navigate("/login", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(formData, setLoading);
    setFormData({
      title: "",
      status: "to do",
      description: "",
    });
    handleClose();
  };

  return (
    <div className={styles.base}>
      <div className={styles.side}>
        <Typography component="div" className={styles.icons}>
          <abbr title="Logout">
            <IconButton onClick={logoutFunction}>
              <LogoutIcon sx={{ color: "#d6d3e4" }} />
            </IconButton>
          </abbr>
          <abbr title="Add new task">
            <IconButton onClick={handleOpen}>
              <AddBoxIcon sx={{ color: "#d6d3e4" }} />
            </IconButton>
          </abbr>
        </Typography>
      </div>
      {/* Create task model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={style}
          className={styles.taskBox}
        >
          <Typography component="h1">Add new task</Typography>

          <Typography component="div">
            <TextField
              id="outlined-textarea"
              label="Title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              InputProps={{
                sx: {
                  color: "rgb(255, 211, 158)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(137, 71, 163)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(250, 140, 195)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(250, 140, 195)",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "rgb(137, 71, 163)",
                  "&.Mui-focused": {
                    color: "rgb(250, 140, 195)",
                  },
                },
              }}
            />

            <Select
              labelId="dropdown-label"
              id="dropdown"
              required
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Select an Option"
              sx={{
                color: "rgb(255, 211, 158)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(137, 71, 163)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
              }}
              inputProps={{
                sx: {
                  color: "rgb(255, 211, 158)",
                },
              }}
            >
              <MenuItem value="to do">To Do</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </Typography>

          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            label="Description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            InputProps={{
              sx: {
                color: "rgb(255, 211, 158)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(137, 71, 163)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(250, 140, 195)",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "rgb(137, 71, 163)",
                "&.Mui-focused": {
                  color: "rgb(250, 140, 195)",
                },
              },
            }}
          />

          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "rgb(93, 23, 121)" }}
          >
            {loading ? (
              <CircularProgress
                size="30px"
                sx={{ color: "rgb(210, 114, 248)" }}
              />
            ) : (
              "Create"
            )}
          </Button>
        </Box>
      </Modal>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Base;

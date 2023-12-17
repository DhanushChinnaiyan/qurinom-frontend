import React, { useState } from "react";
import { useCommonContext } from "../../State Management/ContextApi";
import { Draggable } from "react-beautiful-dnd";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./task.module.css";

// style for edit card
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

const SingleList = ({ index, item }) => {
  const { deleteTask, editTask } = useCommonContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(item);

  //   handling model
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   delete task
  const handleDelete = () => {
    deleteTask(item._id);
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
    await editTask(item, formData, setLoading);
    handleClose();
  };
  return (
    <Draggable draggableId={item._id} index={index} key={item._id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`singleList ${snapshot.isDragging ? "drag" : ""}`}
        >
          <Card sx={{ backgroundColor: "#494263" }}>
            <Typography component="div" display="flex" justifyContent="end">
              <IconButton onClick={handleOpen}>
                <EditIcon color="secondary" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </Typography>
            <CardContent sx={{ display: "grid", justifyContent: "center" }}>
              <Typography component="h2" className={styles.title}>
                {item.title.toUpperCase()}
              </Typography>

              <Typography variant="div" className={styles.status}>
                {item.status.toUpperCase()}
              </Typography>
            </CardContent>
          </Card>
          {/* Edite model */}
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
                  "EDIT"
                )}
              </Button>
            </Box>
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default SingleList;

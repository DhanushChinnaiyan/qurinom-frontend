import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useCommonContext } from "../../State Management/ContextApi";
import SingleList from "./SingleList";
import styles from "./task.module.css";
import { CircularProgress, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const Tasks = () => {
  const { data, editTask } = useCommonContext();
  const [loading, setLoading] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // return if destination not correct
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newData = { ...data };
    // get dragging item
    const draggedItem = newData[source.droppableId][source.index];

    // Remove dragged item from previou location
    newData[source.droppableId].splice(source.index, 1);
    // calling ediTask function to update the status
    editTask(draggedItem, { status: destination.droppableId }, setLoading);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        {loading ? (
          <Typography component="div" sx={style}>
            <CircularProgress />
          </Typography>
        ) : (
          Object.keys(data).map((key) => (
            <div key={key} className={styles.column}>
              <h3 style={{ textAlign: "center" }}>{key.toUpperCase()}</h3>
              <Droppable droppableId={key}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.tasks}
                    style={{ minHeight: "10px" }}
                  >
                    {data[key].map((item, index) => (
                      <SingleList key={item._id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))
        )}
      </div>
    </DragDropContext>
  );
};

export default Tasks;

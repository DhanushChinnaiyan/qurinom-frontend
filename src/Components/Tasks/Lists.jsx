import React from "react";
import { useCommonContext } from "../../State Management/ContextApi";
import { Droppable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";
import SingleList from "./SingleList";

const Lists = () => {
    const { data, setData } = useCommonContext();

  return (
    <Typography component="div" className="container">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <Typography
            component="div"
            className={`todo ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Typography component="span">To Do</Typography>
            {data.todo?.map((item, idx) => (
              <SingleList index={idx} item={item} key={idx} status="todo" />
            ))}
            {provided.placeholder}
          </Typography>
        )}
      </Droppable>
      <Droppable droppableId="InProgressList">
        {(provided, snapshot) => (
          <Typography 
           ref={provided.innerRef}
            component="div"
            className={`todo ${
              snapshot.isDraggingOver ? "dragInProgress" : ""
            }`}
            {...provided.droppableProps}
            
          >
            <Typography component="span">In Progress</Typography>
            {data.inProgress?.map((item, idx) => (
              <SingleList
                index={idx}
                item={item}
                key={idx}
                status="inProgress"
              />
            ))}
            {provided.placeholder}
          </Typography>
        )}
      </Droppable>
      <Droppable droppableId="Completed">
        {(provided, snapshot) => (
          <Typography
            component="div"
            className={`todo ${snapshot.isDraggingOver ? "dragcompleted" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Typography component="span">Completed</Typography>
            {data.completed?.map((item, idx) => (
              <SingleList
                index={idx}
                item={item}
                key={idx}
                status="completed"
              />
            ))}
            {provided.placeholder}
          </Typography>
        )}
      </Droppable>
    </Typography>
  );
};

export default Lists;

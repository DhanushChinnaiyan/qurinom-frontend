import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useCommonContext } from "../../State Management/ContextApi";
import Lists from "./Lists";
import SingleList from "./SingleList";

const Tasks = () => {

    const {data,setData} = useCommonContext()

    const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Check if dropped outside a droppable area
    if (!destination) return;

    // Check if dropped in the same location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Retrieve the item that is being dragged
    const item = data[source.droppableId][source.index];

    // Remove the item from its original position
    const newData = { ...data };
    newData[source.droppableId].splice(source.index, 1);

    // Add the item to the new position
    newData[destination.droppableId].splice(destination.index, 0, item);

    // Update the state with the new data
    setData(newData);
  };
    
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container">
            {Object.keys(data).map((key) => (
              <div key={key} className="column">
                <h2>{key.toUpperCase()}</h2>
                <Droppable droppableId={key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="task-list"
                    >
                      {data[key].map((item, index) => (
                        <SingleList item={item} index={index}/>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
  );
};

export default Tasks;

import React from 'react'
import { useCommonContext } from '../../State Management/ContextApi';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const SingleList = ({index,item}) => {
    const {data,setData} = useCommonContext();

  return (
    <Draggable draggableId={item._id} index={index} key={item._id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`singleList ${snapshot.isDragging ? "drag" : ""}`}
      >
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {item.title} {/* Assuming 'title' exists in 'item' */}
            </Typography>
            <Typography variant="body2">{item.description}</Typography> {/* Assuming 'description' exists in 'item' */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    )}
  </Draggable>
  )
}

export default SingleList
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { Card, CardHeader } from "@material-ui/core";

import Dot from "./Dot";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    overflow: "unset",
    position: "absolute",
    cursor: "move",
    zIndex: 10,
    height: 60,
  },
  border_red: {
    overflow: "unset",
    position: "absolute",
    cursor: "move",
    zIndex: 10,
    height: 60,
    border: "1px solid red",
  },
});

const cardHeader = makeStyles({
  root: {
    padding: 9
  }
})

const Box = ({
  text,
  destination,
  setDestination,
  addArrow,
  setArrows,
  boxId,
  handler,
  icon,
  name,
  isBordered,
  x,
  y
}) => {
  const dragRef = useRef();
  const boxRef = useRef();

  const dropHandler = (e) => {
    e.stopPropagation();
    if (e.dataTransfer.getData("arrow") === boxId) {
      console.log(e.dataTransfer.getData("arrow"), boxId);
      return;
    } else {
      const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
      addArrow(refs);
      console.log("droped!", refs);
    }
  };

  const classes = useStyles();
  const cardHeaderStyle = cardHeader()
  return (
    <Draggable
      bounds="main"
      ref={dragRef}
      defaultPosition={{x, y}}
      onDrag={(e) => setArrows((arrows) => [...arrows])}
    >
      <Card
        className={isBordered ? classes.root : classes.border_red}
        id={boxId}
        ref={boxRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => dropHandler(e)}
      >
        <CardHeader className={cardHeaderStyle.root} avatar={icon} title={name} subheader={text} />
        {handler.map((dot) => (
          <Dot
            key={dot}
            {...{
              boxId,
              handler: dot,
              destination,
              setDestination,
              dragRef,
              boxRef,
              addArrow,
            }}
          />
        ))}
      </Card>
    </Draggable>
  );
};

export default Box;

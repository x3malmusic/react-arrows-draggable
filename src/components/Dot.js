import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";

const connectPointOffset = {
  left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
  right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
  top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
  bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" },
};

const Dot = ({ boxId, handler, dragRef, boxRef }) => {
  const ref1 = useRef();

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);

  const dragStartHandler = (e) => {
    setBeingDragged(true);
    e.dataTransfer.setData("arrow", boxId);
  };

  const dragHandler = (e) => {
    const { offsetTop, offsetLeft } = boxRef.current;
    const { x, y } = dragRef.current.state;
    setPosition({
      position: "absolute",
      left: e.clientX - x - offsetLeft - 258,
      top: e.clientY - y - offsetTop,
      transform: "none",
      opacity: 0,
    });
  };

  const dragEndHandler = () => {
    setPosition({});
    setBeingDragged(false);
  };

  return (
    <>
      <div
        className="connectPoint"
        style={{
          ...connectPointOffset[handler],
          ...position,
        }}
        id={boxId}
        draggable
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => dragStartHandler(e)}
        onDrag={(e) => dragHandler(e)}
        onDragEnd={(e) => dragEndHandler()}
        ref={ref1}
      />
      {beingDragged ? <Xarrow start={boxId} end={ref1} path="grid" /> : null}
    </>
  );
};

export default Dot;

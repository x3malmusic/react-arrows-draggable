import { AddCircle, Description, Search } from "@material-ui/icons";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "../components/Box";

const Icon = ({ component }) => {
  const useStyles = makeStyles({
    avatar: {
      backgroundColor: "#0099ff",
    },
  });
  const classes = useStyles();

  const ReqIcon = component;
  return <ReqIcon className={classes.avatar} fontSize="large" />;
};

export const templates = {
  start: {
    component: Box,
    name: "Edit object",
    text: "Edit any object with a query",
    boxId: "box",
    icon: <Icon component={AddCircle} />,
    handler: ["right"],
  },
  search: {
    component: Box,
    name: "Delete object",
    text: "Delete object with a query",
    boxId: "box",
    icon: <Icon component={Search} />,
    handler: ["left", "right"],
  },
  finish: {
    component: Box,
    name: "JSON",
    text: "Edit any object with a query",
    boxId: "box",
    icon: <Icon component={Description} />,
    handler: ["left"],
  },
};

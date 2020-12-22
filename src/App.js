import React, { useState } from "react";
import {List, Card, CardHeader, Input, Accordion, AccordionSummary, AccordionDetails, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";
import Xarrow from "react-xarrows";

import { templates } from "./utils/templates";

function ComponentIs(props) {
  const SpecificComponent = props.component;
  return <SpecificComponent {...props} />;
}

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 8,
    cursor: "move",
    borderRadius: 4,
  },
});

const cardHeader = makeStyles({
  root: {
    padding: 9
  }
})

const accordion = makeStyles({
  root: {
    padding: 0
  }
})

const App = () => {

  const styles = useStyles();
  const cardHeaderStyle = cardHeader();
  const accordionStyles = accordion()

  const [arrows, setArrows] = useState([]);
  const [chosenElement, setChosenElement] = useState(null);
  const [elements, setElements] = useState([]);

  const dragHandler = (element) => {
    setChosenElement(templates[element]);
  };

  const dropHandler = (e) => {
    let x = e.clientX - 258
    let y = e.clientY
    if (chosenElement) setElements([...elements, {...chosenElement, boxId: chosenElement.boxId + Date.now(), x,  y}]);
    setChosenElement(null);
  };

  const addArrow = ({ start, end }) => {
    if (!arrows.find((arrow) => arrow.end === end && arrow.start === start))
      setArrows([...arrows, { id: start + end, start, end }]);
  };

  const isBordered = (id) => {
    return !!arrows.find((pos) => pos.start === id || pos.end === id);
  };

  const arrowClick = (e) => {
    setArrows(arrows.filter((arr) => arr.id !== e.target.id));
  };

  return (
    <>
      <div className="app-container">
        <div className="aside">
          <h1>API Designer</h1>
          <Input
            placeholder='Search'
            disableUnderline
          />
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>System Steps</Typography>
            </AccordionSummary>
          </Accordion>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Integrations</Typography>
            </AccordionSummary>
          </Accordion>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Actions</Typography>
            </AccordionSummary>
            <AccordionDetails className={accordionStyles.root}>
              <List component="ul" className={styles.root}>
                {Object.entries(templates).map((elem) => (
                  <Card
                    variant="outlined"
                    className={styles.item}
                    key={elem[0]}
                    id={elem[0]}
                    draggable
                    onDragStart={(e) => dragHandler(e.target.id)}
                  >
                    <CardHeader
                      className={cardHeaderStyle.root}
                      title={elem[1].name}
                      subheader={elem[1].text}
                      avatar={elem[1].icon}
                    />
                  </Card>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Rules</Typography>
            </AccordionSummary>
          </Accordion>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Category Name</Typography>
            </AccordionSummary>
          </Accordion>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Category Name Long</Typography>
            </AccordionSummary>
          </Accordion>
        </div>
        <main
          className="action"
          onDragOver={(e) => e.preventDefault()}
          onDrop={e => dropHandler(e)}
        >
          {elements.map((elem, index) => (
            <ComponentIs
              component={elem.component}
              key={elem.boxId + index}
              text={elem.text}
              handler={elem.handler}
              icon={elem.icon}
              name={elem.name}
              boxId={elem.boxId + index}
              x={elem.x}
              y={elem.y}
              isBordered={isBordered(elem.boxId + index)}
              {...{ addArrow, setArrows }}
            />
          ))}
          {arrows.map((ar) => (
            <Xarrow
              start={ar.start}
              end={ar.end}
              key={ar.start + "-." + ar.end}
              path="grid"
              headSize={0}
              arrowBodyProps={{ id: `${ar.start + ar.end}` }}
              onClick={(e) => arrowClick(e)}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default App;

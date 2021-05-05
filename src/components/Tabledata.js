import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Navbar from "./Navbar";
import { Container } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Tabledata() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`http://6090d8143847340017021d60.mockapi.io/Users?page=1&limit=10`)
      .then((res) => setRows(res.data));
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  console.log(rows);

  return (
    <div>
      <Navbar />
      <Container>
        <div className={classes.root}>
          {rows.map((row) => (
            <Accordion
              expanded={expanded === row.id}
              onChange={handleChange(row.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading} style={{ textAlign: 'center'}}>
                  {row.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    `this is {row.name} detail mobileno : {row.mobileno} hobby {row.hobby.toString()}`
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </div>
  );
}

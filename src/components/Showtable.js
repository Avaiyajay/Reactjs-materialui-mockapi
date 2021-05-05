import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Navbar from "./Navbar";
import { Container , Button } from "@material-ui/core";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Showtable() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  const handledelete = (id) => {
    console.log(id , "this is handledelete")
    axios
      .delete(`http://6090d8143847340017021d60.mockapi.io/Users/${id}`)
      .then((res) => {
        if(res.status === 200)
        {
          axios
            .get(`http://6090d8143847340017021d60.mockapi.io/Users?page=1&limit=10`)
            .then((res) => setRows(res.data))
            .catch(err => console.error(err))
        }else{
          console.log("something went wrong while deleting");
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios
      .get(`http://6090d8143847340017021d60.mockapi.io/Users?page=1&limit=10`)
      .then((res) => setRows(res.data))
      .catch(err => console.error(err))
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Mobile No.</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">password</StyledTableCell>
                <StyledTableCell align="right">city</StyledTableCell>
                <StyledTableCell align="right">gender</StyledTableCell>
                <StyledTableCell align="right">hobby</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.mobileno}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.password}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.gender}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.hobby.toString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handledelete(row.id)}>
                      <img
                        src="https://cdn1.vectorstock.com/i/1000x1000/42/40/trash-icon-garbage-symbol-can-bin-delete-and-vector-21894240.jpg"
                      style={{ height : "25px" , width : "20px" }}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

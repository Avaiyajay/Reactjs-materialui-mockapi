import React, { useState } from "react";
import Navbar from "./Navbar";

import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  Button,
} from "@material-ui/core";

import { Container } from "@material-ui/core";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyle = makeStyles((theme) => ({
  root: {
    border: ".1px solid grey",
    display: "block",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px",
    borderRadius: "10px",
    background: "linear-gradient(#e66465, yellow)",
    marginBottom: "30px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textinput: {
    width: "70%",
    marginBottom: "10px",
  },
  radiodiv: {
    display: "flex",
  },
  maingenderdiv: {
    width: "70%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "5px",
  },
  first: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexBasis: 0.5,
  },
  second: {
    width: "50%",
    padding: "5px",
    flexBasis: 1.5,
  },
  formControl: {
    width: "100%",
  },
  selectdiv: {
    width: "70%",
  },
  maincheckbox: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
  },
  checkboxleft: {
    flexBasis: 1,
    paddingTop: "10px",
  },
  checkboxright: {
    flexBasis: 4,
    display: "flex",
  },
}));

const Form = () => {
  const classes = useStyle();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [gender, setGender] = useState("");
  const [hobby, setHobby] = useState({
    cricket: false,
    chess: false,
    singing: false,
    dancing: false,
    drawing: false,
    typing: false,
    watchingmovie: false,
  });
  const [mobileno, setMobileno] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handlename = (e) => {
    setName(e.target.value);
  };

  const handlepassword = (e) => {
    setPassword(e.target.value);
  };

  const handleemail = (e) => {
    setEmail(e.target.value);
  };

  const handlegender = (e) => {
    setGender(e.target.value);
  };

  const handlecity = (e) => {
    setCity(e.target.value);
  };

  const handlehobby = (e) => {
    setHobby({ ...hobby, [e.target.name]: e.target.checked });
  };

  const handlemobile = (e) => {
    setMobileno(e.target.value);
  };

  const validatedata = () => {
    const returnarray = [];
    if (name === "" && name.trim().length == 0) {
      returnarray.push("Please Enter Name");
    }

    if (password !== confirmpassword) {
      returnarray.push("Password didn't match");
    }

    if (password.length <= 7) {
      returnarray.push("Password is too short");
    }

    if (city === "") {
      returnarray.push("Please enter city");
    }
    if (mobileno === "") {
      returnarray.push("Please enter mobileno");
    } else if (mobileno.length !== 10) {
      returnarray.push(
        "It seems like you miss or wrote some extra digit in mobileno"
      );
    } else if (isNaN(mobileno)) {
      returnarray.push("Only digits are allowed in mobileno field");
    }

    if (email === "") {
      returnarray.push("Please enter email");
    }
    const emailregx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailregx.test(email)) {
      returnarray.push("Please Enter Valid Email");
    }
    return returnarray;
  };

  const handlesubmit = (e) => {
    const output = validatedata();
    if (output.length === 0) {
      let actualhobby = [];
      Object.entries(hobby).map((item) => {
        if (item[1] == true) {
          actualhobby.push(item[0]);
        }
      });
      axios
        .post(`http://6090d8143847340017021d60.mockapi.io/Users`, {
          name: name,
          email: email,
          password: password,
          mobileno: mobileno,
          city: city,
          gender: gender,
          hobby: actualhobby,
        })
        .then(() => console.log("data saved successfully"))
        .then(() => setError(""))
    } else {
      const newerror = output.toString();
      setError(newerror);
    }
  };
  console.log(error);

  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <div className={classes.center}>
          {error && error.split(",").map((item) => (
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                  style={{ width : "70%" }}
                >
                  <strong>{item}</strong>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    style = {{ float : "right" }}
                  > 
                    <span aria-hidden="true">
                      <img
                        src="https://www.flaticon.com/svg/vstatic/svg/1828/1828778.svg?token=exp=1620206220~hmac=c725a45cc4c12a2c295beb33483f7601"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </span>
                  </button>
                </div>
                ))}
          <TextField
            id="textfield"
            className={classes.textinput}
            label="Username"
            value={name}
            onChange={handlename}
          ></TextField>
          <br></br>
          <TextField
            id="textfield"
            className={classes.textinput}
            label="Password"
            value={password}
            onChange={handlepassword}
          ></TextField>
          <br></br>
          <TextField
            id="textfield"
            className={classes.textinput}
            label="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          ></TextField>
          <br></br>
          <TextField
            id="textfield"
            className={classes.textinput}
            label="Email"
            value={email}
            onChange={handleemail}
          ></TextField>
          <br></br>
          <TextField
            id="textfield"
            className={classes.textinput}
            label="mobile No"
            value={mobileno}
            onChange={handlemobile}
          ></TextField>
          <br></br>
          <div className={classes.maingenderdiv}>
            <div className={classes.first}>
              <FormLabel className={classes.genderlabel}>Gender</FormLabel>
            </div>
            <div className={classes.second}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={gender}
                onChange={handlegender}
              >
                <div style={{ display: "inline", position: "relative" }}>
                  <div className={classes.radiodiv}>
                    <div>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <br></br>
          <div className={classes.selectdiv}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                onChange={handlecity}
              >
                <MenuItem value={"surat"}>Surat</MenuItem>
                <MenuItem value={"ahmedabad"}>Ahmedabad</MenuItem>
                <MenuItem value={"bhavnagar"}>Bhavnagar</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br></br>
          <div className={classes.maincheckbox}>
            <div className={classes.checkboxleft}>
              <FormLabel className={classes.hobbylabel}>Hobby</FormLabel>
            </div>
            <div className={classes.checkboxright}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobby.cricket}
                      onChange={handlehobby}
                      name="cricket"
                      color="primary"
                    />
                  }
                  label="cricket"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobby.chess}
                      onChange={handlehobby}
                      name="chess"
                      color="primary"
                    />
                  }
                  label="chess"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobby.singing}
                      onChange={handlehobby}
                      name="singing"
                      color="primary"
                    />
                  }
                  label="singing"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobby.typing}
                      onChange={handlehobby}
                      name="typing"
                      color="primary"
                    />
                  }
                  label="typing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobby.watchingmovie}
                      onChange={handlehobby}
                      name="watchingmovie"
                      color="primary"
                    />
                  }
                  label="watchingmovie"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobby.drawing}
                      onChange={handlehobby}
                      name="drawing"
                      color="primary"
                    />
                  }
                  label="drawing"
                />
              </div>
            </div>
          </div>
          <br></br>
          <Button variant="contained" onClick={handlesubmit} color="secondary">
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Form;

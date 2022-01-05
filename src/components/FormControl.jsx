import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Box } from "@mui/system";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";

const FormControl = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  
  const [loginData, setLoginData] = useState({
    
  });
//   console.log(loginData);


  const user = users.map((e) => e.name);

  let data = [];
  for (let i = 0; i < user.length; i++) {
    data.push({ label: user[i], value: user[i] });
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  //   console.log(selectedOption.value);
  // console.log(users);
  let obj = users?.find((o) => o.name === selectedOption?.value);
    const id = obj?.id;
  const handleOnBlur = (e) => {
      
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;

    setLoginData(newLoginData);
  };
 const handleOnBlurUser = () =>{
    console.log(id);
    const field = "userId";
    const value = id;
   
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
 }
  const handleTeamConfirm = () => {
   
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data);
          setSuccess(true);
        }
      })
      .catch(error => console.log('Error:', error));
      ;
  };

  console.log(error);
 
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ mt: 10, width: "40%" }}>
        <Typography sx={{ mb: 3 }}>create post</Typography>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          onBlur={handleOnBlurUser}
          options={data}
        />
        <TextField
          sx={{ width: "100%", mt: 3 }}
          id="filled-hidden-label-normal"
          onBlur={handleOnBlur}
          label="title"
          name="title"
          variant="filled"
        />
        <TextField
          sx={{ width: "100%", mt: 3 }}
          id="filled-hidden-label-normal"
          name="body"
          onBlur={handleOnBlur}
          label="body"
          variant="filled"
        />

        <Button
          sx={{ mr: 2,mt:3 }}
          onClick={handleTeamConfirm}
          variant="contained"
        >Submit</Button>
      </Box>
      {
          success && 
          <Alert severity="success">post sucessfully</Alert>
      }
     
   
    </Grid>
  );
};

export default FormControl;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, Select, MenuItem, InputLabel, Card } from "@mui/material";
import useToken from "../../hooks/useToken";
import jwt_decode from "jwt-decode";

const theme = createTheme();

async function addRequest(data) {
  return fetch("http://localhost:3000/api/v1/requests/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
    body: data,
  }).then((data) => data.json());
}

export default function StudentNewRequest() {
  const { token, setToken } = useToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = jwt_decode(token).username;
    alert(jwt_decode(token));
    const today = new Date();
    const request = data.get("Additional")
      ? JSON.stringify({
          requestInfo: data.get("subject"),
          userIndexNo: data.get("index"),
          userName: userName,
          requestType: data.get("type"),
          additionalDetails: data.get("additional"),
          submittedDate: today,
          approvalStatus: "pending",
        })
      : JSON.stringify({
          requestInfo: data.get("subject"),
          userIndexNo: data.get("index"),
          userName: userName,
          requestType: data.get("type"),
          submittedDate: today,
          approvalStatus: "pending",
        });
    alert(
      JSON.stringify({
        requestInfo: data.get("subject"),
        userIndexNo: data.get("index"),
        userName: userName,
        submittedDate: today,
        requestType: data.get("type"),
        additionalDetails: data.get("additional"),
        approvalStatus: "pending",
      })
    );
    const response = await addRequest(
      JSON.stringify({
        requestInfo: data.get("subject"),
        userIndexNo: data.get("index"),
        userName: userName,
        submittedDate: today,
        requestType: data.get("type"),
        additionalDetails: data.get("additional"),
        approvalStatus: "pending",
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            backgroundColor: "#eeeeee",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Request
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  autoComplete="Subject"
                  name="subject"
                  required
                  fullWidth
                  id="subject"
                  label="Subject"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Index Number"
                  name="index"
                  required
                  fullWidth
                  id="indexnumber"
                  label="Index Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="Name"
                />
              </Grid>
              <Grid item xs={12} justifyContent="center">
                <FormControl sx={{ minWidth: 100 }} fullWidth>
                  <InputLabel id="select-label">Request Type</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    name="type"
                    label="Request Type"
                    fullWidth
                  >
                    <MenuItem value={"late-add-drop"}>Late Add/Drop</MenuItem>
                    <MenuItem value={"extend-deadline"}>
                      Deadline Extension
                    </MenuItem>
                    <MenuItem value={"repeat-as-first-attempt"}>
                      Repeat Exam
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="additional"
                  name="additional"
                  label="Additional Information"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

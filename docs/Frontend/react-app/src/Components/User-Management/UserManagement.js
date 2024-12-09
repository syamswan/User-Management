import React, { useState, useEffect } from "react";
import Table from "@mui/joy/Table";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
// import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import Check from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import Box from "@mui/joy/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Modal from "@mui/material/Modal";

//Start of Icons
import CloseIcon from "@mui/icons-material/Close";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PeopleIcon from "@mui/icons-material/People";
// End of Icons

import "./UserManagement.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: " linear-gradient(#492d65, #273881)",
  boxShadow: 24,
  height: 150,
  p: 4,
};

function UserManagement() {
  // State
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [userData, setUserData] = useState([]);
  const [personalDetails, setPersonalDetails] = useState("");
  const [userDeleteId, setUserDeleteId] = useState();

  const [userAlertStatus, setUserAlertStatus] = useState(null);
  const [userAlertMessage, setUserAlertMessage] = useState(null);

  // Css
  const InputVariable = {
    marginBottom: "10px",
  };

  // UsersList

  function fetchUsers() {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((error) => console.error(error));
  }

  function fetchUsersUI() {
    let usersList = userData.users;

    if (usersList !== undefined) {
      return (
        <Sheet sx={{ background: "transparent" }}>
          <Table hoverRow stickyHeader>
            <thead>
              <tr>
                <th>S.no</th>
                <th>User Name</th>
                <th>First name</th>
                <th>Last name</th>
                <th>City</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((row, index) => (
                <tr key={row.PersonID}>
                  <td>{index + 1}</td>
                  <td>{row.UserName}</td>
                  <td>{row.FirstName}</td>
                  <td>{row.LastName}</td>
                  <td>{row.City}</td>
                  <td>{row.Address}</td>
                  <td>
                    <IconButton
                      color="primary"
                      onClick={() => editUserForm(row)}
                      sx={{
                        "--IconButton-size": "14px",
                        "--Button-gap": "24px",
                      }}
                    >
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="danger"
                      sx={{
                        "--IconButton-size": "14px",
                        "--Button-gap": "24px",
                      }}
                      onClick={() => {
                        setUserDeleteId(row.PersonID);
                        setOpen(true);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      );
    } else {
      return (
        <Table hoverRow stickyHeader>
          <thead>
            <tr>
              <th>S.no</th>
              <th>User Name</th>
              <th>First name</th>
              <th>Last name</th>
              <th>City</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr colSpan={7}>No Data Available</tr>
          </tbody>
        </Table>
      );
    }
  }

  function userAlert(status, editStatus) {
    let message;
    let statusMessage;

    if (editStatus === true) {
      statusMessage = "edited";
    } else {
      statusMessage = "added";
    }

    if (status === "success") {
      message = `User have been ${statusMessage} Successfully`;
    } else if (status === "Cancelled") {
      message = `Cancelled..!! User not deleted`;
      status = "error";
    }

    setUserAlertStatus(status);
    setUserAlertMessage(message);

    setTimeout(() => {
      setUserAlertStatus(null);
      setUserAlertMessage(null);
    }, 3000);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    let personJson = {};
    let personUrl = "";
    let editStatus = false;

    console.log(personalDetails, personalDetails.PersonID);

    if (
      personalDetails.PersonID !== "undefined" &&
      personalDetails.PersonID !== "" &&
      personalDetails.PersonID !== undefined
    ) {
      personJson = {
        PersonID: personalDetails.PersonID,
        UserName: personalDetails.username,
        FirstName: personalDetails.first_name,
        LastName: personalDetails.last_name,
        City: personalDetails.city,
        Address: personalDetails.address,
      };

      personUrl = "http://localhost:4000/api/users/edit";
      editStatus = true;
    } else {
      personJson = {
        UserName: personalDetails.username,
        FirstName: personalDetails.first_name,
        PasswordHash: personalDetails.password_hash,
        LastName: personalDetails.last_name,
        City: personalDetails.city,
        Address: personalDetails.address,
      };

      personUrl = "http://localhost:4000/api/users/add";
      editStatus = false;
    }

    axios
      .post(personUrl, JSON.stringify(personJson), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        userAlert("success", editStatus);
        resetUserForm();
        fetchUsers();
      })
      .catch(function (error) {
        console.error("Error:", error);
        userAlert("error");
      });
  }

  function HandleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setPersonalDetails((previousState) => {
      return { ...previousState, [name]: value };
    });
  }

  function addUsers() {
    return (
      <form onSubmit={HandleSubmit} style={{ padding: "10px" }}>
        <label>
          <Input
            type="text"
            placeholder="Enter the Username"
            onChange={HandleChange}
            style={InputVariable}
            value={
              personalDetails.username !== undefined
                ? personalDetails.username
                : ""
            }
            name="username"
            variant="soft"
          />
        </label>
        <Input
          type="text"
          placeholder="Enter the First Name"
          onChange={HandleChange}
          variant="soft"
          style={InputVariable}
          value={
            personalDetails.first_name !== undefined
              ? personalDetails.first_name
              : ""
          }
          name="first_name"
        />
        <Input
          type="text"
          placeholder="Enter the Last Name"
          onChange={HandleChange}
          variant="soft"
          style={InputVariable}
          value={
            personalDetails.last_name !== undefined
              ? personalDetails.last_name
              : ""
          }
          name="last_name"
        />

        {(personalDetails.PersonID === undefined ||
          personalDetails.PersonID === "") && (
          <Input
            type="password"
            placeholder="Password"
            onChange={HandleChange}
            variant="soft"
            style={InputVariable}
            value={
              personalDetails.password_hash !== undefined
                ? personalDetails.password_hash
                : ""
            }
            name="password_hash"
          />
        )}

        <Input
          type="text"
          placeholder="Enter the City"
          onChange={HandleChange}
          variant="soft"
          style={InputVariable}
          value={personalDetails.city !== undefined ? personalDetails.city : ""}
          name="city"
        />
        <Textarea
          type="text"
          minRows={2}
          placeholder="Address"
          onChange={HandleChange}
          style={InputVariable}
          value={
            personalDetails.address !== undefined ? personalDetails.address : ""
          }
          name="address"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "10px",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              startDecorator={<CloseIcon />}
              color="neutral"
              size="sm"
              onClick={resetUserForm}
            >
              Reset
            </Button>

            <Button
              startDecorator={<Check />}
              type="submit"
              value="submit"
              color="primary"
              size="sm"
            >
              Submit
            </Button>
          </Box>
        </div>
      </form>
    );
  }

  function editUserForm(row) {
    const editUserDetails = {};

    editUserDetails["PersonID"] = row["PersonID"];
    editUserDetails["username"] = row["UserName"];
    editUserDetails["first_name"] = row["FirstName"];
    editUserDetails["last_name"] = row["LastName"];
    editUserDetails["city"] = row["City"];
    editUserDetails["address"] = row["Address"];

    return setPersonalDetails(editUserDetails);
  }

  function deleteUserForm(deleteId) {
    axios
      .delete("http://localhost:4000/api/users/delete", {
        data: { PersonID: deleteId },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setOpen(false);
        setUserAlertStatus("success");
        setUserAlertMessage(response.data.message);

        setTimeout(() => {
          setUserAlertStatus(null);
          setUserAlertMessage(null);
        }, 3000);
        fetchUsers();
      })
      .catch(function (error) {
        console.error("Error:", error);
        setOpen(false);
        userAlert("error");
      });
  }

  function resetUserForm() {
    const resetDetails = {};
    for (const key in personalDetails) {
      resetDetails[key] = "";
    }
    return setPersonalDetails(resetDetails);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleModal() {
    if (open === true) {
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 style={{ marginRight: "auto", color: "white" }}>
              <ErrorOutlineIcon fontSize="medium" />
              Are You Sure ?
            </h2>

            <p style={{ color: "white" }}>
              This action will delete the User from the system
            </p>

            <div style={{ display: "flex", justifyContent: "end", gap: 4 }}>
              <Button
                startDecorator={<CloseIcon />}
                color="neutral"
                size="sm"
                onClick={() => {
                  setOpen(false);
                  userAlert("Cancelled", "");
                }}
              >
                Cancel
              </Button>
              <Button
                startDecorator={<Check />}
                color="danger"
                size="sm"
                onClick={() => {
                  deleteUserForm(userDeleteId);
                }}
              >
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
      );
    }
  }
  return (
    <Grid
      className="user-manage-section"
      container
      style={{ backgroundColor: "transparent", borderRadius: 0, marginTop: 60 }}
    >
      {handleModal()}
      {userAlertStatus && (
        <Stack
          sx={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
          spacing={2}
        >
          <Alert
            severity={userAlertStatus}
            onClose={() => {
              userAlertStatus(null);
              setUserAlertMessage(null);
            }}
          >
            {userAlertMessage}
          </Alert>
        </Stack>
      )}

      <Grid
        xs={12}
        style={{ padding: "10px", display: "flex", color: "white" }}
      >
        <PeopleIcon sx={{ marginRight: "10px", marginBlockStart: "18px" }} />
        <h4>User Management</h4>
      </Grid>
      <Grid xs={4}>
        <Sheet sx={{ background: "transparent" }}>{addUsers()}</Sheet>
      </Grid>
      <Grid xs={8} style={{ padding: "10px" }}>
        {fetchUsersUI()}
      </Grid>
    </Grid>
  );
}

export default UserManagement;

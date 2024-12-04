const express = require("express");
const router = express.Router();
const db = require("../../src/config/database");
const bcrypt = require("bcrypt");

const cors = require("cors");
router.use(cors());

// Fetch Users
router.get("/", (req, res, next) => {
  db.query("SELECT * FROM Users", (error, results, fields) => {
    if (error) {
      return;
    }

    const UsersList = results.map((ele) => {
      delete ele.PasswordHash;
      return ele;
    });

    res.status(200).json({
      message: "Users were fetched",
      users: UsersList,
    });
  });
});

// Add User
router.post("/add", async (req, res) => {
  const { UserName, FirstName, City } = req.body;

  if (!UserName) {
    return res.status(500).send("UserName cannot be empty");
  }

  if (!FirstName) {
    return res.status(500).send("FirstName cannot be empty");
  }

  if (!City) {
    return res.status(500).send("City cannot be empty");
  }

  const userExistQuery = `SELECT * FROM Users`;

  db.query(userExistQuery, [req.body.UserName], (err, result) => {
    let userNames = result.map((users) => {
      return users.UserName;
    });

    if (userNames.includes(req.body.UserName)) {
      return res.status(400).send("UserName already exists");
    } else {
      return addUser(req, res);
    }
  });
});

function addUser(req, res) {
  const user = {
    UserName: req.body.UserName,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    PasswordHash: req.body.PasswordHash,
    City: req.body.City,
    Address: req.body.Address,
  };

  const saltRounds = 10;

  bcrypt.hash(user.PasswordHash, saltRounds, (err, hash) => {
    if (err) throw err;

    const sql =
      "INSERT INTO Users (UserName, FirstName, LastName, PasswordHash, City, Address) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        user.UserName,
        user.FirstName,
        user.LastName,
        hash,
        user.City,
        user.Address,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).send("Error adding user");
        } else {
          res.status(200).json({
            status: "success",
            message: "User added Successfully",
            users: user,
          });
        }
      }
    );
  });
}

// Edit User
router.post("/edit", async (req, res) => {
  const userExistQuery = `SELECT * FROM Users`;

  db.query(userExistQuery, [req.body.UserName], (err, result) => {
    let selectedUser = result.filter((users) => {
      if (req.body.UserName === users.UserName) {
        return users;
      }
    });

    if (selectedUser.length !== 0) {
      selectedUser.forEach((element) => {
        if (element.UserName === req.body.UserName) {
          if (element.PersonID === req.body.PersonID) {
            return editUser(req, res);
          } else {
            return res.status(400).send("UserName already exists");
          }
        } else {
          return editUser(req, res);
        }
      });
    } else {
      return editUser(req, res);
    }
  });
});

function editUser(req, res) {
  const user = {
    PersonID: req.body.PersonID,
    UserName: req.body.UserName,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    City: req.body.City,
    Address: req.body.Address,
  };

  const sql =
    "UPDATE Users SET UserName=?, FirstName=?, LastName=?, City=?, Address=? WHERE PersonID = ?";
  db.query(
    sql,
    [
      user.UserName,
      user.FirstName,
      user.LastName,
      user.City,
      user.Address,
      user.PersonID,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error editing user");
      } else {
        res.status(200).json({
          status: "success",
          message: "User Edited Successfully",
          users: user,
        });
      }
    }
  );
}

// Delete User
router.delete("/delete", (req, res) => {
  const user = {
    PersonID: req.body.PersonID,
  };

  const sql = "DELETE from Users WHERE PersonID = ?";
  db.query(sql, [user.PersonID], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting user");
    } else {
      res.status(200).json({
        message: "User deleted Successfully",
        users: user,
      });
    }
  });
});

module.exports = router;

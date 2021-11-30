const app = require("express");
const jwt = require("jsonwebtoken");
const router = app.Router();

const config = require("../../../config");
const db = require("../../../util/database");
const { responseFormat } = require("../../../util/default");
const ErrorMessage = require("../../../util/error-message");

router.post("/signup", function (req, res, next) {
  const response = responseFormat();

  if (
    !req.body.data ||
    !req.body.data.email ||
    !req.body.data.password ||
    !req.body.data.confirmPassword ||
    req.body.data.password !== req.body.data.confirmPassword
  ) {
    response.error = ErrorMessage.input.invalidInput;
    res.status(400).json(response);
    return;
  }

  const { email, password } = req.body.data;

  db.getDb()
    .collection("users")
    .findOne({ email, password })
    .then((userDoc) => {
      if (userDoc) {
        throw new Error();
      }
    })
    .then(() => {
      return db.getDb().collection("users").insertOne({
        email,
        password,
        createdDate: new Date(),
      });
    })
    .then((result) => {
      const user = {
        id: result.insertedId.toString(),
        email,
      };

      jwt.sign(
        {
          user,
        },
        config.jwt.secrect,
        {
          expiresIn: config.jwt.expiresIn,
        },
        (err, token) => {
          if (err) {
            throw new Error(ErrorMessage.user.invalidUserOrPassword);
          }

          response.data = {
            id: user.id,
            email,
            token,
          };

          res.json(response);
        }
      );
    })
    .catch(() => {
      response.error = ErrorMessage.user.invalidUserOrPassword;
      res.status(400).json(response);
    });
});

router.post("/signin", function (req, res, next) {
  const response = responseFormat();
  const email = req.body.data.email;
  const password = req.body.data.password;

  if (!email || !password) {
    res.status(400).json(response);
    return;
  }

  db.getDb()
    .collection("users")
    .findOne({ email, password })
    .then((userDoc) => {
      if (!userDoc) {
        throw new Error();
      }

      const user = {
        id: userDoc._id.toString(),
        email,
      };

      jwt.sign(
        {
          user,
        },
        config.jwt.secrect,
        {
          expiresIn: config.jwt.expiresIn,
        },
        (err, token) => {
          if (err) {
            throw new Error(ErrorMessage.user.invalidUserOrPassword);
          }

          response.data = {
            id: user.id,
            email,
            token,
          };

          res.json(response);
        }
      );
    })
    .catch(() => {
      response.error = ErrorMessage.user.invalidUserOrPassword;
      res.status(400).json(response);
    });
});

router.get("/logout/:email", function (req, res, next) {
  const response = responseFormat();
  const email = req.params.email;

  if (!email) {
    res.status(400).json(response);
    return;
  }

  // Fake data
  response.data = {
    email,
  };

  res.json(response);
});

module.exports = router;

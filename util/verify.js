const jwt = require("jsonwebtoken");
const config = require("../config");
const { responseFormat } = require("../util/default");
const ErrorMessage = require("../util/error-message");

exports.checkTokenExpiredIn = (req, res, next) => {
  jwt.verify(req.token, config.jwt.secrect, (err, authData) => {
    const response = responseFormat();

    if (err) {
      response.error = ErrorMessage.user.unauthenication;
      res.json(response);
    } else {
      next();
    }
  });
};

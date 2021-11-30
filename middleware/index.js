const jwt = require("jsonwebtoken");

const { openRoute } = require("../config");
const { responseFormat } = require("../util/default");
const { checkTokenExpiredIn } = require("../util/verify");
const ErrorMessage = require("../util/error-message");

exports.verifyToken = (req, res, next) => {
  const response = responseFormat();
  const openRouteIndex = openRoute.findIndex((route) => {
    return route === req.url;
  });

  if (openRouteIndex === -1) {
    if (!req.headers["authorization"]) {
      response.error = ErrorMessage.user.unauthenication;
      res.status(403).json(response);
      return;
    }

    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;

    checkTokenExpiredIn(req, res, next);
  } else {
    next();
  }
};

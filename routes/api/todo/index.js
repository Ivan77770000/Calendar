const app = require("express");
const { ObjectId } = require("mongodb");
const router = app.Router();

const db = require("../../../util/database");
const { responseFormat } = require("../../../util/default");
const ErrorMessage = require("../../../util/error-message");

router.get("/:userId/:year/:month/:day", function (req, res, next) {
  const response = responseFormat();

  const userId = req.params.userId;
  const year = +req.params.year;
  const month = +req.params.month;
  const day = +req.params.day;

  if (!userId || !year || !month || !day) {
    response.error = ErrorMessage.common.invalidParameters;
    res.status(400).json(response);
    return;
  }

  db.getDb()
    .collection("todos")
    .find({ userId: new ObjectId(userId), year, month, day })
    .toArray()
    .then((todos) => {
      response.data = todos;
      res.json(response);
    })
    .catch((err) => {
      response.error = ErrorMessage.common.somethingWentWrong;
      res.status(400).json(response);
    });
});

router.post("/:userId", function (req, res, next) {
  const response = responseFormat();

  const userId = req.params.userId;
  const year = req.body.data.year;
  const month = req.body.data.month;
  const day = req.body.data.day;
  const title = req.body.data.title;
  const from = req.body.data.from;
  const to = req.body.data.to;
  const detail = req.body.data.detail;

  if (!userId || !year || !month || !day || !title || !from || !to || !detail) {
    response.error = ErrorMessage.common.invalidParameters;
    res.status(400).json(response);
    return;
  }

  db.getDb()
    .collection("todos")
    .insertOne({
      userId: new ObjectId(userId),
      year,
      month,
      day,
      title,
      from,
      to,
      detail,
      createdDate: new Date(),
    })
    .then((result) => {
      response.data = result;
      res.json(response);
    })
    .catch((err) => {
      response.error = ErrorMessage.common.somethingWentWrong;
      res.status(400).json(response);
    });
});

router.put("/:todoId", function (req, res, next) {
  const response = responseFormat();

  const todoId = req.params.todoId;
  const title = req.body.data.title;
  const from = req.body.data.from;
  const to = req.body.data.to;
  const detail = req.body.data.detail;

  if (!todoId || !title || !from || !to || !detail) {
    response.error = ErrorMessage.common.invalidParameters;
    res.status(400).json(response);
    return;
  }

  db.getDb()
    .collection("todos")
    .updateOne(
      {
        _id: new ObjectId(todoId),
      },
      {
        $set: {
          title,
          from,
          to,
          detail,
        },
      }
    )
    .then((result) => {
      response.data = result;
      res.json(response);
    })
    .catch((err) => {
      response.error = ErrorMessage.common.somethingWentWrong;
      res.status(400).json(response);
    });
});

router.delete("/:todoId", function (req, res, next) {
  const response = responseFormat();
  const todoId = req.params.todoId;

  if (!todoId) {
    response.error = ErrorMessage.common.invalidParameters;
    res.status(400).json(response);
    return;
  }

  db.getDb()
    .collection("todos")
    .deleteOne({ _id: new ObjectId(todoId) })
    .then((result) => {
      response.data = result;
      res.json(response);
    })
    .catch((err) => {
      response.error = ErrorMessage.common.somethingWentWrong;
      res.status(400).json(response);
    });
});

router.delete("/:userId/:year/:month/:day", function (req, res, next) {
  const response = responseFormat();

  const userId = req.params.userId;
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;

  if (!userId || !year || !month || !day) {
    response.error = ErrorMessage.common.invalidParameters;
    res.status(400).json(response);
    return;
  }

  db.getDb()
    .collection("todos")
    .deleteMany({
      userId: new ObjectId(userId),
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    })
    .then((result) => {
      response.data = result;
      res.json(response);
    })
    .catch((err) => {
      response.error = ErrorMessage.common.somethingWentWrong;
      res.status(400).json(response);
    });
});

module.exports = router;

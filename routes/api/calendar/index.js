const app = require("express");
const { ObjectId } = require("mongodb");
const router = app.Router();

const db = require("../../../util/database");
const { responseFormat } = require("../../../util/default");
const ErrorMessage = require("../../../util/error-message");

router.get("/today", function (req, res, next) {
  const response = responseFormat();
  const today = new Date();
  let month = today.getUTCMonth() + 1;
  let year = today.getUTCFullYear();
  let day = today.getDate();

  response.data = {
    year,
    month,
    day,
  };

  res.json(response);
});

router.get("/:userId", function (req, res, next) {
  const response = responseFormat();
  const today = new Date();

  const userId = req.params.userId;

  if (!userId) {
    response.error = ErrorMessage.common.invalidParameters;
    res.status(400).json(response);
    return;
  }

  let month = today.getUTCMonth() + 1;
  let year = today.getUTCFullYear();
  let dayOfMonth = today.getDate();

  if (
    req.query.year &&
    req.query.month &&
    req.query.month > 0 &&
    req.query.month < 13 &&
    (year !== +req.query.year || month !== +req.query.month)
  ) {
    year = parseInt(req.query.year);
    month = parseInt(req.query.month);
    dayOfMonth = 0;
  }

  const firstDay = new Date(year, month - 1).getDay();
  const daysInMonth = 32 - new Date(year, month - 1, 32).getDate();

  // prev month
  let prevYear = year;
  let prevMonth = month - 1;

  if (prevMonth === 0) {
    prevYear = year - 1;
    prevMonth = 12;
  }
  const prevDaysInMonth = 32 - new Date(prevYear, prevMonth - 1, 32).getDate();

  // next month
  let nextYear = year;
  let nextMonth = month + 1;
  let nextMonthFirstDay = 1;

  if (nextMonth === 13) {
    nextYear = year + 1;
    nextMonth = 1;
  }

  const calendar = [];
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const days = [];

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const day = {
          year: prevYear,
          month: prevMonth,
          day: prevDaysInMonth + j + 1 - firstDay,
          dayOfWeek: j + 1,
          taskNumber: 0,
        };

        days.push(day);
      } else if (date > daysInMonth) {
        const day = {
          year: nextYear,
          month: nextMonth,
          day: nextMonthFirstDay++,
          dayOfWeek: j + 1,
          taskNumber: 0,
        };

        days.push(day);
      } else {
        const day = {
          year,
          month,
          day: date++,
          dayOfWeek: j + 1,
          taskNumber: 0,
        };

        days.push(day);
      }
    }

    calendar.push(days);
  }

  db.getDb()
    .collection("todos")
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          year,
          month,
        },
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray()
    .then((todos) => {
      const todoObj = {};
      todos.map((todo) => {
        todoObj[todo._id] = todo.count;
      });

      calendar.map((week) => {
        week.map((day) => {
          if (todoObj[day.day.toString()])
            day.taskNumber = todoObj[day.day.toString()];
        });
      });

      response.data = {
        year,
        month,
        dayOfMonth,
        calendar,
      };

      res.json(response);
    })
    .catch((err) => {
      response.error = ErrorMessage.common.somethingWentWrong;
      res.status(400).json(response);
    });
});

module.exports = router;

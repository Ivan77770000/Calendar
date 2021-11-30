const app = require("express");
const router = app.Router();

const apiUser = require("./api/user");
const apiCalendar = require("./api/calendar");
const apiTodo = require("./api/todo");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("pages/index", { title: "Text mode" });
});

/* API */
// User
router.use("/api/user", apiUser);
// Calendar
router.use("/api/calendar", apiCalendar);
// Todo
router.use("/api/todo", apiTodo);

module.exports = router;

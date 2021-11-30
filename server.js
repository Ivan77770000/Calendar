const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const database = require("./util/database");

database.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(process.env.PORT || 8000);
  }
});

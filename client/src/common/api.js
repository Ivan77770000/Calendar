import server from "../config/server";

const version = "api";
const url = `${server.host}${version}/`;

const user = {
  signup: `${url}user/signup`,
  signin: `${url}user/signin`,
  logout: `${url}user/logout`,
};

const calendar = {
  index: `${url}calendar`,
  today: `${url}calendar/today`,
};

const todo = {
  index: `${url}todo`,
};

const api = {
  user,
  calendar,
  todo,
};

export default api;

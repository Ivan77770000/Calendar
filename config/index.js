const openRoute = [
  "/api/user/signin",
  "/api/user/signup",
  "/api/calendar/today",
];

module.exports = {
  jwt: {
    secrect: "mysecret",
    expiresIn: 60 * 60 * 24,
  },
  openRoute,
};

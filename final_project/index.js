const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  const authorizationText = req.header("authorization");
  if (!authorizationText) {
    return res.status(401).json({ error: "Access-denied" });
  }
  try {
    console.log(authorizationText);
    jwt.verify(authorizationText.slice(7), "access", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "User not authenticated" });
      } else {
        req.user = user;
        next(); // Proceed to the next middleware
      }
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid-token" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));

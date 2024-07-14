// server.js
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import productRouter from "./routes/products.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import connectViaMongoose from "./db-utils/mongoose-connection.js";
import orderRouter from "./routes/orders.js";

const app = express();
app.use(express.json());
app.use(cors());

const logger = (req, res, next) => {
  console.log(new Date().toString(), req.method, req.url);
  next();
};

app.use(logger);

// Connect to MongoDB
await connectViaMongoose();

// Use routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);

const tokenVerify = (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};

app.use("/products", tokenVerify, productRouter);
app.use("/order", tokenVerify, orderRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

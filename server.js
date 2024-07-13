// server.js
import express from "express";
import cors from "cors";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import connectViaMongoose from "./db-utils/mongoose-connection.js";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

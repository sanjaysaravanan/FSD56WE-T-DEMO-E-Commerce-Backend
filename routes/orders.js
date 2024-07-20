import express from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { Order } from "../db-utils/models.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", async (req, res) => {
  const token = req.headers["authorization"];

  try {
    const id = v4();
    const { products, totalQty } = req.body;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const body = {
      userId: user.userId,
      products,
      totalQty,
      orderId: id,
      orderTotal: products.reduce((p, c) => p + c.qty * c.price, 0),
    };

    const order = new Order(body);

    await order.save();
    res.json({ msg: `OrderNo: ${id} Placed Successfully`, orderNo: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export default orderRouter;

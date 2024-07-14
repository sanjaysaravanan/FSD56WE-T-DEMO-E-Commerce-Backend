import express from "express";
import { Order } from "../db-utils/models.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", async (req, res) => {
  try {
    const id = Date.now().toString();
    const { products, totalQty } = req.body;
    const body = {
      products,
      totalQty,
      orderId: id,
      orderTotal: products.reduce((p, c) => p + c.qty * c.price, 0),
    };

    const order = new Order(body);

    await order.save();
    res.json({ msg: `OrderNo: ${id} Placed Successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export default orderRouter;

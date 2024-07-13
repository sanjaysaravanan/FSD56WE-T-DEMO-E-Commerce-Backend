// routes/register.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../db-utils/models.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, phone, email, address, userType, gstNo, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const userId = Date.now().toString();

    user = new User({
      name,
      userId,
      phone,
      email,
      address,
      userType,
      gstNo,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
});

export default router;

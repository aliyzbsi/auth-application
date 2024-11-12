const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Şifreyi hariç tutarak tüm kullanıcıları alın
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Kullanıcılar alınırken bir hata oluştu" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Kullanıcı kaydedildi" });
  } catch (error) {
    res.status(500).json({ message: "hata oluştu", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifre yanlış" });

    // JWT token oluşturma
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Giriş başarılı" });
  } catch (error) {
    console.error("Login hatası:", error); // Hata mesajını logla
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

module.exports = router;

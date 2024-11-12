const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((error) => console.log("Mongo bağlantı hatası:", error));

app.listen(PORT, () => {
  console.log(`server ${PORT} portunda çalışıyor`);
});

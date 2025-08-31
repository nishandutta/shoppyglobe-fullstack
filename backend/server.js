const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use(healthRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});

const dotenv = require("dotenv");
const express = require("express");
//const cors = require("cors")
const app = express();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

app.use(express.json()); //changing json data to objects
// app.use(cors({
//     origin: "http://127.0.0.1:5173",
//     credentials: true,
// })
// );
app.use(require("./router/routes"));
app.use(require("./router/paymentRoutes"));
app.use(require("./router/trainersRoutes"));

app.listen(PORT, () => {
  console.log(`Listining the Port at ${PORT}`);
});

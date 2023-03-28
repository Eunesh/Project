const dotenv = require("dotenv");
const express = require("express");
//const cors = require("cors")
const app = express();

//const stripe = require("stripe"("")); // To do




dotenv.config({ path: './config.env'});

//require('./db/conn');  

const PORT = process.env.PORT


app.use(express.json()); //changing json data to objects
// app.use(cors({
//     origin: "http://127.0.0.1:5173",
//     credentials: true,
// })
// );
app.use(require('./router/routes'));






// app.get("/", (req, res)=>{
//     res.send("Hellow from server app");
// })

app.listen(PORT, ()=>{
    console.log(`Listining the Port at ${PORT}`)
})
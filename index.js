
//Libraries
const path = require("path");
const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//Middlewares
const dbConnect = require("./Middlewares/dbConnect")

//Routers
const scriptRouter = require("./Routers/script.router")
const userRouter = require("./Routers/user.router");
const glassRouter = require("./Routers/glass.router");
const quoteRouter = require("./Routers/quote.router");
const reportRouter = require("./Routers/report.router");
const glassQuoteRouter = require("./Routers/glassQuote.router")
//App
const app = express();


//Configuration
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload());

//Static file configuration
app.use(express.static("Public"));

//Routing
app.use("/api/scripts",scriptRouter)
app.use("/api/users",userRouter);
app.use("/api/glasses",glassRouter);
app.use("/api/quotes",quoteRouter);
app.use("/api/reports",reportRouter)
app.use("/api/glassQuotes",glassQuoteRouter)

//Static file serving
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Public","index.html"))
})
//Initializing the server
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running on: " + process.env.PORT);
        dbConnect(process.env.DB_URI);
     
    }
})
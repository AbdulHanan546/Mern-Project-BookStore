import express, { request, response } from "express";
import  {PORT ,mongodbURL}  from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express()

// Option 1 : that allows all origins with default of cors(*)
//app.use(cors())
//Option 2 : Allow custom origins

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET","PUT","POST","DELETE"],
        allowedHeaders: ['Content-Type']
    })
)

app.get("/", (request,response)=>{
    console.log(request)
    return response.status("200").send("Welcome to mern stack tutorial")
})
app.use(express.json())

app.use("/books",booksRoute)

mongoose.connect(mongodbURL).then(()=>{

    console.log("Database is connected")
    app.listen(PORT, ()=>{
        console.log(`Server is running at port  ${PORT}`)
    })
})
.catch((error)=>{
console.log(error)
})
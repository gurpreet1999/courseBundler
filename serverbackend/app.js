import express  from "express";
import {config} from "dotenv"
import course from "./routes/courseRoute.js"
import user from "./routes/userRoutes.js"
import payment from "./routes/paymentRoute.js"
import Errormiddleware from "./middleware/Error.js"
import cookieParser from "cookie-parser";
import otherroute from "./routes/otherRoutes.js"
import cors from "cors"

config({
    path:"./config/config.env"
})




const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}

const app=express()
// using middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


app.use(cookieParser()) //Cookies aren't parsed by Express by default. You have to install the cookie-parser middleware to get them to populate into req.cookies.


// importing and using route

app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)
app.use("/api/v1",otherroute)



app.use(Errormiddleware)   // ye middleware humesa last me use hona chaiye  ye error miidleware humesa lst me anna chaiye
export default app
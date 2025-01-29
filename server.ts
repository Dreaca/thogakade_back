import express from "express";
import customerRoutes from "./routes/customer-routes";
import itemRoutes from "./routes/item-routes";
import authRoutes, {authenticateToken} from "./routes/auth-routes";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());


app.use("/",(req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    next();
})


app.use('/auth',authRoutes)
app.use(authenticateToken);

app.use('/customer',customerRoutes)
app.use('/items',itemRoutes)

app.listen(3000,(err)=>{
    console.log("Server running on port 3000");
});

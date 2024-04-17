import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import jwt, { JwtPayload } from "jsonwebtoken";



const JWT_SECRET = "test123"

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));


app.post("/signin",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign({id:1},JWT_SECRET) ;

    res.cookie("token",token);
    res.send("Logged in!");
})


app.get("/user", (req,res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload;

    res.send({userId : decoded.id})
})


app.post("/logout",(req,res)=> {
    res.cookie("token","ads");
    res.json({message:"Logged out!"})
})



app.listen(3000,()=>{console.log("Listening on port 3000 🔥")})

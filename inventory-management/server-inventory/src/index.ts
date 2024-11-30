import express from "express"
import dotenv from "dotenv"
import morgan  from "morgan"
import helmet from "helmet"
import bodyParser from "body-parser"
import cors from "cors"
import dashboardRoutes from "./routes/dashboardRoutes"
import productRoutes from "./routes/productRoutes"
import usersRoute from "./routes/usersRoute"
import expenseByCategory from "./routes/expenseRoute"
 
dotenv.config()
const app=express()
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


const port=process.env.port || 3001;

app.use("/",dashboardRoutes);

app.use("/products",productRoutes);


app.use("/users",usersRoute);

app.use("/expenses",expenseByCategory)
// app.use("");

const mongoose=require('mongoose');

const mongoURI="mongodb+srv://inventory:inventory@cluster0.7tx93.mongodb.net/comments?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{console.log("Connected Successfully")})
.catch((err:any)=>console.log(err))
app.get('/hi',async(req,res)=>{
  res.send("helo")
});
app.listen(port,()=>{
  console.log("sevrer is started")
})

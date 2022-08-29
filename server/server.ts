import  express, { application, response }  from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import { request } from "https";
import { body } from "express-validator";
import apiRouter from "./router/apiRouter";

const app:express.Application = express();

//configurations
app.use(cors());     //CORS
//dotenv.config(options:{path:'./.env'});
dotenv.config({path:'./.env'}); // for env variables
app.use(express.json()); //json form data

let hostName:string|undefined = process.env.HOST_NAME;
let port:number|undefined = Number(process.env.PORT);  
let mongoDBURL:string | undefined = process.env.MONGODB_URL;


//MongoDB  Connection
if(mongoDBURL){
    mongoose.connect(mongoDBURL).then((response:Mongoose)=>{
        console.log(`Connected to MongoDB Successfully...`);
    }).catch((error)=>{
        console.error(error);
        process.exit(1); //stop the node js process
    })
}

/*app.get('/',(request:express.Request,response:express.Response)=>{
    response.status(code:200).json(body:{
        msg:'Welcome to Express Server of bigBasket App'
    });
});*/


app.get('/',(request:express.Request , response :express.Response)=>{
response.status(200).json({
    msg:'Welcome to Express Server of bigBasket App'
});
});  

//router configuration
app.use('/api/v1',apiRouter)

if(port !==undefined && hostName!==undefined){
    app.listen(port,hostName,()=>{
        console.log(`Express Server is Started at : http://${hostName}:${port}`);
    });
}
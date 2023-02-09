/*import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"

import { DataBase } from "./backend/db/dataBase.js"
import { Routers } from "./backend/routes/userRoutes.js"
import { UserController } from "./backend/controler/UserController.js"
import { UserModel } from "./backend/model/userModel.js"
import { middleareSecurity } from "./config.js"

const Express = express();
dotenv.config();

class App {
    Banco;
    Routes;
    constructor(banco, routes) {
        this.Banco = banco
        this.Routes = routes
    }

    initApp(){
        try {
            this.Banco.Connect()
            Express.set("trust proxy",1)
            Express.use(cors())
            Express.use(json())
            Express.use("/api",middleareSecurity,this.Routes)
            Express.listen(process.env.PORT || 3000,()=>{
               console.log("servidor rodando") 
            })
        } catch (error) {
            console.log(error)
        }
    }
}


function init() {
    const controll = new UserController(UserModel)
    const routes = new Routers(controll)
    const database = new DataBase()
    const app = new App(database, routes.createRoutes())
    app.initApp();
}

init()
*/

import express from "express";

const app = express()
const routers = express.Router()

app.use("/",(req,res)=>{
    res.json({
        MessageChannel:"funcionando"
    })
})

routers.route("/service").get((req,res)=>{
    res.json({
        message:"serviços ativados"
    })
})


app.use("/api",routers)


app.listen(process.env.PORT || 3000,()=>{
    console.log("fucnionou")
})

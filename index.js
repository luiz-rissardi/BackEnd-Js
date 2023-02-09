import express, { Router, json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"

import { DataBase } from "./backend/db/dataBase.js"
import { Routers } from "./backend/routes/userRoutes.js"
import { UserController } from "./backend/controler/UserController.js"
import { UserModel } from "./backend/model/userModel.js"

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
            const server = http.createServer(Express)
            Express.use(cors())
            Express.use(json())
            Express.use("/api",this.Routes)
            server.listen(process.env.PORT || 3000)
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
    app.initApp()
}

init()
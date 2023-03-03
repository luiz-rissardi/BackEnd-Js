import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import * as io from "socket.io"

import { DataBase } from "./src/db/dataBase.js"
import { Routers } from "./src/routes/userRoutes.js"
import { UserController } from "./src/controller/UserController.js"
import { UserModel } from "./src/model/userModel.js"
import { middleareSecurity } from "./config.js"
import { on } from "events"

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
            Express.use(cors())
            Express.use(json())
            Express.set("trust proxy",1)
            Express.use("/api",middleareSecurity,this.Routes)
            const server = http.createServer(Express)

            //sockets io server
            const socketServer = new io.Server(server);
            socketServer.on("connection",(client)=>{
                client.on("connectRoom",(room)=>{
                    client.join(room);
                    client.on("newChat",(chat,roomUser2)=>{
                        socketServer.to(roomUser2).emit("subscribeChat",chat)
                    })
                })
            })


            server.listen(process.env.PORT || 3000)
        } catch (error) {
            return "não foi possivel conectar no servidor"
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
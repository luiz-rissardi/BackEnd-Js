import express, { Router, json } from "express"
import { DataBase } from "./backend/db/dataBase.js"
import cors from "cors"
import {RoutesCall} from "./backend/routes/Router.js"
import { Routers } from "./backend/routes/userRoutes.js"
import { UserController } from "./backend/controler/UserController.js"
import { UserModel } from "./backend/model/userModel.js"

const ROUTERS = new Routers(new UserController(UserModel),Router()).createRoutes()

class App {
    Banco;
    constructor(banco, express, cors, routes, json) {
        try {
            this.Banco = banco
            express.use(cors())
            express.use(json())
            express.use("/api", routes.getRotas())
            express.listen(3000,() => {
                console.log("conectado com sucesso")
                this.conectarBanco()
            })
        } catch (error) {
            console.log(error)
            console.log("erro no servidor!")
        }
    }
    conectarBanco() {
       try {
        console.log("conectando...")
        this.Banco.Connect()
       } catch (error) {
        console.log("erro ao conectar no banco")
       }
    }
}

const exp = express()
const database = new DataBase()
const app = new App(database, exp, cors,new RoutesCall(ROUTERS), json)

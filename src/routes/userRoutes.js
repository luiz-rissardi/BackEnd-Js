import { Router } from "express";
import { loginLimit, CreateLimit, UpadteLimit } from "../../config.js"

class Routers{
    controller;
    Routes;
    constructor(UserController){
        this.Routes = Router();
        this.controller = UserController;
    }
    
    createRoutes(){
        this.Routes.route("/services").post(CreateLimit,(req,res)=>{
            this.controller.create(req,res)
        })
        
        this.Routes.route("/services/:id").put(UpadteLimit,(req,res)=>{
            this.controller.updateUser(req,res)
        })
        
        this.Routes.route("/login").post(loginLimit,(req,res)=>{
            this.controller.login(req,res)
        })

        return this.Routes
    }
}

export  {Routers}
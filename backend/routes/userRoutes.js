import { Router } from "express";

class Routers{
    controller;
    Routes;
    constructor(UserController){
        this.Routes = Router();
        this.controller = UserController;
    }
    
    createRoutes(){
        this.Routes.route("/services")
        .post((req,res)=>{
            this.controller.create(req,res)
        })
        
        this.Routes.route("/services/:id").put((req,res)=>{
            this.controller.updateUser(req,res)
        })
        
        this.Routes.route("/login").post((req,res)=>{
            this.controller.login(req,res)
        })

        return this.Routes
    }
}

export  {Routers}

class Routers{
    controller;
    Routes;
    constructor(UserController,routes){
        this.Routes = routes;
        this.controller = UserController;
    }
    createRoutes(){
        this.Routes.route("/services")
        .post((req,res)=>{
            try {
                this.controller.create(req,res)
            } catch (error) {
                console.log(error)
            }
        }).get((req,res)=>{
            try {
                this.controller.getUsers(req,res)
            } catch (error) {
                console.log(error)
            }
        })

        return this.Routes
    }
}

export  {Routers}
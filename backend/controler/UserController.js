
class UserController{
    model
    constructor(UserModel){
        this.model = UserModel
    }
    async create(req,res){
        try {
            const user = {
                nome:req.body.nome,
                sobrenome:req.body.sobrenome,
                idade:req.body.idade
            }
            //const response = await this.model.create(user)
            res.json({
                message:"usuario salvo com sucesso!"
            })
        } catch (error) {
            console.log(error)
            console.log("erro ao salvar os dados")
        }
    }
    async getUsers(req,res){
        try {
            const response = await this.model.find()
            res.json({
                message:"dados pegos com sucesso",
                response,
            })
        } catch (error) {
            const response = this.model
            res.json({
                message:"dados pegos com sucesso",
                response,
            })
        }
    }
}


export {
    UserController
}
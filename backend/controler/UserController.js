
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
            const response = await this.model.create(user)
            res.json({
                response,
                message:"usuario salvo com sucesso!"
            })
        } catch (error) {
            console.log(error)
            console.log("erro ao salvar os dados")
        }
    }
    async getUsers(req,res){
        console.log("pegando dados")
        try {
            const response = await this.model.find()
            res.json({
                response,
                message:"dados pegos com sucesso"
            })
        } catch (error) {
            
        }
    }
}


export {
    UserController
}
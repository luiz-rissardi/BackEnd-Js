import { verifyUser } from "../validates/validates.js"


class UserController {
    model
    constructor(UserModel) {
        this.model = UserModel
    }
    async create(req, res) {
        try {
            const user = {
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                chats: []
            }
            const response = await this.model.create(user)
            res.json({
                message: "usuario salvo com sucesso!",
                response
            })
        } catch (error) {
            res.status(400).json({
                error: {
                    message: "não foi possivel inserir um novo usuario, contate a equipe de desenvolvimento"
                }
            })
        }
    }
    async login(req, res) {
        try {
            const password = req.body.password;
            const email = req.body.email;
            const data = await this.model.findOne({ email, password })
            if (data === null) {
                res.status(400).json({
                    message: "senha ou email invalidos",
                })
                return 0
            } else {
                res.json({
                    message: "dados pegos com sucesso",
                    data,
                })
            }

        } catch (error) {
            res.status(500).json({
                message: "erro ao solicitar os dados",
            })
        }
    }

    async updateUser(req, res) {
        try {
            const user = {
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                chats: req.body.chats
            }
            const id = req.params.id;
            if (verifyUser(user)) {
                const data = await this.model.updateOne({ _id: id }, { $set: { ...user } })
                res.json({
                    message: "dados autalizados com sucesso",
                })
            } else {
                res.status(400).json({
                    message: " informe ao menos um dado para atualizar"
                })
            }

        } catch (error) {
            res.status(500).json({
                message: "não foi possivel atualizar os dados entre em contato com a equipe de desenvolvedores"
            })
        }
    }
}


export {
    UserController
}
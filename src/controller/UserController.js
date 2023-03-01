import { alreadyExists, verifyUser } from "../validates/validates.js"



class UserController {
    model
    constructor(UserModel) {
        this.model = UserModel
    }
    async create(req, res) {
        try {
            const user = getdata(req)
            const users = await this.getUsers();
            if (alreadyExists(users)(user)) {
                const response = await this.model.create(user)
                sucess(res)(response)
            } else {
                error400(res)("usuario já cadastrado")
            }
        } catch (error) {
            console.log(error)
            error400(res)("não foi possivel inserir um novo usuario, contate a equipe de desenvolvimento")
        }
    }

    async login(req, res) {
        try {
            const password = req.body.password;
            const email = req.body.email;
            const data = await this.model.find({ email, password })
            if (data === undefined) {
                error400(res)("senha ou email invalidos")
            } else {
                sucess(res)(data)
            }

        } catch (error) {
            error500(res)("erro ao solicitar os dados")
        }
    }

    async updateUser(req, res) {
        try {
            const user = getdata(req)
            if(user.phone){
                if (verifyUser(user)) {
                    await this.model.updateOne({phone:user.phone}, { $set: { ...user } })
                    sucess(res)("dados autalizados com sucesso")
                } else {
                    error400(res)("informe ao menos um dado para atualizar")
                }
            }else{
                error400(res)("informe o numero para atualização")
            }

        } catch (error) {
            error500(res)("não foi possivel atualizar os dados entre em contato com a equipe de desenvolvedores")
        }
    }

    async createChat(req, res) {
        try {
            const phone1 = req.body.phone1;
            const phone2 = req.body.phone2;
            const chatId = req.body.chatId;
            const chat1 = {
                chatId,
                person: {
                    phone:phone2,
                    nome:""
                },
                dateDelet: null
            } , chat2 = {
                chatId,
                person:{
                    phone:phone1,
                    nome:""
                },
                dateDelet: null
            }
            const user1 = await this.getUser({phone:phone1}); 
            const user2 = await this.getUser({phone:phone2});
            chat1.person.nome = user2.nome 
            chat2.person.nome = user1.nome 
            user1.chats.push(chat1);
            user2.chats.push(chat2);
            if (chat2) {
                if(chat1){
                     await this.model.updateOne({ phone: phone1 }, {chats:user1.chats })
                     await this.model.updateOne({ phone: phone2 }, {chats:user2.chats })
                    sucess(res)(user1)
                }else{
                    error400(res)("o seu telefone não foi encontrado")
                }
            }else{
                error400(res)("telefone do usuario não encontrado")
            }
        } catch (error) {
            error500(res)("não foi possivel criar um novo chat entre em contato com a equipe de desenvolvedores")
        }
    }

    async getUsers() {
        try {
            const users = await this.model.find()
            return users;
        } catch (error) {
            throw "fail"
        }
    }

    async getUser(param){
        try {
            const user = await this.model.find(param)
            return user[0];
        } catch (error) {
            throw "fail"
        }        
    }
}


function getdata(req) {
    return {
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        chats: req.body.chats
    }
}

function error400(res) {
    return function (message) {
        res.status(400).json({
            error: {
                message
            }
        })
    }
}

function error500(res) {
    return function (message) {
        res.status(500).json({
            error: {
                message
            }
        })
    }
}

function sucess(res) {
    return function (dados) {
        res.status(200).json({
            dados
        })
    }
}




export {
    UserController
}
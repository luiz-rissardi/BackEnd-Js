import { alreadyExists, verifyUser } from "../validates/validates.js"
import express from "express"


class UserController {
    model
    constructor(UserModel) {
        this.model = UserModel
    }
    async create(req,res) {
        try {
            const user = getdata(req)
            const users = await this.getUser();
            if(alreadyExists(users)(user)){
                const response = await this.model.create(user)
                sucess(res)(response)
            }else{
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
            const id = req.params.id;
            if (verifyUser(user)) {
                const data = await this.model.updateOne({ _id: id }, { $set: { ...user } })
                sucess(res)("dados autalizados com sucesso")
            } else {
                error400(res)("informe ao menos um dado para atualizar")
            }

        } catch (error) {
            error500(res)("não foi possivel atualizar os dados entre em contato com a equipe de desenvolvedores")
        }
    }

    async getUser(){
        const users = await this.model.find()
        return users
    }
}


function getdata(req){
    return {
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        chats: req.body.chats
    }
}

function error400(res){
    return function(message){
        res.status(400).json({
            error:{
                message
            }
        })
    }
}

function error500(res){
    return function (message){
        res.status(500).json({
            error:{
                message
            }
        })
    }
}

function sucess(res){
    return function (dados){
        res.json({
            dados
        })
    }
}




export {
    UserController
}
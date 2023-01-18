import { set, connect } from "mongoose"

class DataBase{
    uri =  "mongodb+srv://Rissardi:UskF85KfCsXCsuXp@cluster0.oxqcfzm.mongodb.net/?retryWrites=true&w=majority";
    constructor(){
        set("strictQuery",true)
    }
    async Connect(){
        try {
            await connect(this.uri)
            console.log("banco conectado")
        } catch (error) {
            console.log(error)
            console.log("erro ao conectar no banco")
        }
    }
}

export {
    DataBase
}
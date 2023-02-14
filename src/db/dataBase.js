import { set, connect } from "mongoose"

class DataBase{
    constructor(){
        set("strictQuery",true)
    }
    async Connect(){
        try {
            const data = await connect(process.env.MONGODB_URI)
        } catch (error) {
            throw "não foi possivel conectar ao banco"
        }
    }
}

export {
    DataBase
}
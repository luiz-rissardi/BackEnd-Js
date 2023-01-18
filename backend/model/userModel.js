import { model, Schema } from "mongoose"



class UserShema{
    Shema = new Schema({
        nome : {
            type:String,
            required:true
        },
        sobrenome : {
            type:String,
            required:true
        },
        idade : {
            type:Number,
            required:true
        }
    })

}

const UserModel = model("user",new UserShema().Shema)

export {
    UserModel
}


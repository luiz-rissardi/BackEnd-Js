import { model, Schema } from "mongoose"



class UserShema{
    Shema = new Schema({
        nome : {
            type:String,
            required:true
        },
        email : {
            type:String,
            required:true
        },
        password : {
            type:String,
            required:true
        },
        phone : {
            type:Number,
            required:true
        },
        chats : {
            type:Array,
            required:true
        }
    })
}

const UserModel = model("user",new UserShema().Shema)

export {
    UserModel
}


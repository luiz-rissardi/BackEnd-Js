import { rateLimit,MemoryStore } from "express-rate-limit";

function middleareSecurity(req,res,next){
    const api_key = req.header("x-api-key")
    if(api_key === process.env.API_SECRET){
        next();
    }else{
        res.status(500).json({
            error:{
                message:" chave de api invalida"
            }
        })
    }
}

const loginLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max:5,
    message:"limites de tentativas de login ultrapassadas tente novamente mais tarde!",
    store:new MemoryStore(),
    legacyHeaders: false,
    standardHeaders: true,
    
})


const UpadteLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max:50,
    legacyHeaders: false,
    standardHeaders: true
})

const CreateLimit = rateLimit({
    windowMs: 60 * 24 * 60 * 1000,
    max:3,
    legacyHeaders: false,
    standardHeaders: true
})

export {
    middleareSecurity,
    loginLimit,
    UpadteLimit,
    CreateLimit
}
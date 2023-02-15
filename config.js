import { rateLimit,MemoryStore } from "express-rate-limit";

function middleareSecurity(req,res,next){
    const api_key = req.header("x-api-key")
    if(api_key === process.env.API_SECRET){
        next();
    }else{
        res.status(401).json({
                message:"não autorizado"
        })
    }
}

const loginLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max:5,
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

const createChatsLimit = rateLimit({
    windowMs:3 * 60 * 1000,
    max:10,
    legacyHeaders: false,
    standardHeaders: true
})

export {
    middleareSecurity,
    loginLimit,
    UpadteLimit,
    CreateLimit,
    createChatsLimit
}
 function verifyUser(user){
    if(user.chats == undefined && user.email == undefined && user.nome == undefined && user.password == undefined && user.phone == undefined){
        return false;
    }
    else{
        return true
    }
 }


function alreadyExists(users){
    return function(user){
        let bool = true
        for(let el of users){
            if(el.email == user.email && el.phone == user.phone){
                bool = false
                break;
            }
        }
        return bool
    }
}

 export {
    verifyUser,
    alreadyExists
 }
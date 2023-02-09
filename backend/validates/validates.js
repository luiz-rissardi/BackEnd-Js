 function verifyUser(user){
    if(user.chats == undefined && user.email == undefined && user.nome == undefined && user.password == undefined && user.phone == undefined){
        return false;
    }
    else{
        return true
    }
 }

 export {
    verifyUser
 }
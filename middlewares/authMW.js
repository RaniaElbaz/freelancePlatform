const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
        let decodedToken=null;
    try
    {
        let token=request.get("Authorization").split(" ")[1];
        // console.log(decodedToken);
        decodedToken=jwt.verify(token,"mysecret");
        console.log(decodedToken.role);
        request.role=decodedToken.role;
        request.id=decodedToken.id;
        next();
    }
    catch(error)
    {
        error.message="Not Authorized";
        error.status= 403;
        next(error);      
    }
}
const { stack } = require("../routes/contactRoutes");
const constants= require("../constants")

const errorHandler=(err,req,res,next)=>{
    const statusCode= res.statusCode ? res.statusCode:500;
    switch (statusCode){
        case constants.VALIDATION:
            res.json({
                title:"Validation Error",
                message:err.message,
                stackTrace:err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Not found",
                message:err.message,
                stackTrace:err.stack
            });
        case constants.UNAUTHORIZED:
            res.json({
                title:"Un-Athorized",
                message:err.message,
                stackTrace:err.stack
            });
        case constants.FORBIDDEN:
            res.json({
                title:"Forbidden",
                message:err.message,
                stackTrace:err.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title:"Server error",
                message:err.message,
                stackTrace:err.stack
            });
        default:
            console.log("No error are found")
        break;

    }
}

module.exports=errorHandler;
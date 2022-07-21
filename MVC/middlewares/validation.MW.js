const { validationResult} = require("express-validator")

module.exports = (request, response, next) => {
    let result = validationResult(request)

    if (!result.isEmpty()) {
        console.log(result.errors);
        let massage = result.errors.reduce((current, error) => current + error.msg + " " ,"")
        console.log(massage.msg);
        let error = new Error(massage)
        error.status = 422
        throw error
    } else {
        next()
    }

}
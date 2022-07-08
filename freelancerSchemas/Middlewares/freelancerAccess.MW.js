module.exports.freelancerAccess = (request, response, next) => {
    if (request.role == "freelancer") {
        next();
    } else {
        let error = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
}

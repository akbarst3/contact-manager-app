const {constants} = require('../constant');

const errorHandler = (err, req, res, next) => {
    const error = "Error"
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({
                title: `${error} Not Found`,
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    
        case constants.UNAUTHORIZED:
            res.json({
                title: `${error} Unauthorized`,
                message: err.message,
                stackTrace: err.stack,
            });

            break;
    
        case constants.FORBIDDEN:
            res.json({
                title: `${error} Forbidden`,
                message: err.message,
                stackTrace: err.stack,
            });

            break;
    
        case constants.VALIDATION_ERROR:
            res.json({
                title: `Validation ${error}`,
                message: err.message,
                stackTrace: err.stack,
            });

            break;

        case constants.SERVER:
            res.json({
                title: `Server ${error}`,
                message: err.message,
                stackTrace: err.stack,
            });

            break;
    
        default:
            console.log('Everything OK!')
            break;
    }
}

module.exports = errorHandler;
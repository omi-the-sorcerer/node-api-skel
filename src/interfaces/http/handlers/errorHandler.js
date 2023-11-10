// const { errorHandler, devErrorHandler } = require('./interfaces/http/handlers/errorHandler'); on container.js

module.exports = (err,req,res,next) => {
    const { jsonResponse, logger } = req.container.cradle;

    logger.error(err.stack);
    jsonResponse.error(res, err.message, undefined, err.status);
}
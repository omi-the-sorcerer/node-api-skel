// jsonresponse to express response
const Status = require('http-status');
class JsonResponse {
    constructor(container) {
        this.container = container;
    }

    success(res, data, message, status = Status.OK) {
        res.status(status).json({
            status: 'success',
            timestamp: Math.floor(Date.now() / 1000),
            data: data,
            message: message
        });
    }

    error(res, message, errors, status = Status.INTERNAL_SERVER_ERROR) {
        res.status(status).json({
            status: 'error',
            timestamp: Math.floor(Date.now() / 1000),
            errors: errors,
            error: message
        });
    }
}

module.exports = JsonResponse;
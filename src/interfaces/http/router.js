const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const compression = require('compression');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const routes = require('./routes');

module.exports = ({config, containerMiddleware, loggerMiddleware, errorHandler, jsonResponse}) => {
    const router = Router();
    const apiRouter = Router();

    if (config.env === 'development') {
        router.use(statusMonitor());
    }

    if(config.env !== 'test') {
        router.use(loggerMiddleware);
    }

    // const apiRoutes = routes({containerMiddleware});

    apiRouter
        .use(cors())
        .use(compression())
        .use(methodOverride('X-HTTP-Method-Override'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(helmet());

    router
        .use(containerMiddleware)
        .use('/api', apiRouter)
        .use(errorHandler)
    ;

    return router;
}
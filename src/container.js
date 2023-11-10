const { createContainer, Lifetime, asClass, asValue, asFunction } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const Application = require('./app/Application');
const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const config = require('../config');

//Handlers error, devError
const {errorHandler,devErrorHandler} = require('./interfaces/http/handlers');

//Middlewares
const loggerMiddleware = require('./interfaces/http/middlewares/loggerMiddleware');

//Responses
const JsonResponse = require('./interfaces/http/responses/jsonResponse');

//infra
const logger = require('./infra/logging/logger');

const container = createContainer();
container.register({
    app: asClass(Application, { lifetime: Lifetime.SINGLETON }),
    server: asClass(Server, { lifetime: Lifetime.SINGLETON }),
    logger: asFunction(logger, { lifetime: Lifetime.SINGLETON }),
    router: asFunction(router, { lifetime: Lifetime.SINGLETON }),

    jsonResponse: asClass(JsonResponse, { lifetime: Lifetime.SINGLETON }),

    config: asValue(config),

    loggerMiddleware: asFunction(loggerMiddleware, { lifetime: Lifetime.SINGLETON }),
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.prod ? errorHandler : devErrorHandler),
})

// // Register `scoped` services
// container.loadModules([
//     'app/services/*.js'
// ], {
//     formatName: 'camelCase',
//     resolverOptions: {
//         lifetime: Lifetime.SCOPED
//     }
// });

module.exports = container;
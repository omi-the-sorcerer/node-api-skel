require('dotenv').config()

const fs = require('fs')
const path = require('path')

const ENV = process.env.APP_ENV || 'dev'

let envConfig = {

}

// check if exist path.join(__dirname, 'env', ENV)
if (fs.existsSync(path.join(__dirname, 'env', ENV)+'.js')) {
    envConfig = require(path.join(__dirname, 'env', ENV))
}

const config = Object.assign({
    [ENV]: true,
    env: ENV,
    web: {
        port: process.env.APP_PORT || envConfig.web?.port || 3000,
        interface: process.env.APP_INTERFACE || envConfig.web?.interface || '127.0.0.1'
    },
    logging: envConfig.logging || {
        appenders: {
            cheese: {
                type: 'console',
                filename: path.join(__dirname, 'logs', 'dev.app.log')
            }
        },
        categories: {
            default: {
                appenders: ['cheese'],
                level: 'error'
            }
        }
    }
}, envConfig);

module.exports = config;
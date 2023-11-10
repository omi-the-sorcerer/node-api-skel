const path = require('path');
const logPath = path.join(__dirname, 'logs', 'dev.app.log');
module.exports = {
    web: {
        port: 3001,
        interface: '0.0.0.0'
    },
    logging: {
        appenders: {
            cheese: {
                type: 'console',
                filename: logPath
            }
        },
        categories: {
            default: {
                appenders: ['cheese'],
                level: 'error'
            }
        }
    }
}
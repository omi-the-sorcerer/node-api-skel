const morgan = require('morgan');
const LoggerStream = require('../../../infra/logging/loggerStreamAdapter');

module.exports = ({ logger }) => {
    return morgan('combined', { stream: LoggerStream.toStream(logger) });
}
const express = require('express');

class Server {
    constructor({config, logger, router}) {
        this.config = config;
        this.app = express();
        this.logger = logger;
        this.app.disable('x-powered-by')
        this.app.use(router);
    }
    start() {
        return new Promise((resolve) => {
            const http = this.app.listen(this.config.web.port, this.config.web.interface ,() => {
                const { port,address } = http.address();
                this.logger.info(`[p ${process.pid}] Listening at port ${port} on ${address === '0.0.0.0'? 'all interfaces': address}`)
                resolve();
            });
        })
    }
}

module.exports = Server;
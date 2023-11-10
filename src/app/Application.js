class Application {
    constructor({server}) {
        this.server = server;
        // this.database = database;
        // this.logger = logger;
    }

    async start() {
        // if(this.database) {
        //     await this.database.connect();
        // }

        await this.server.start();
    }
}

module.exports = Application;
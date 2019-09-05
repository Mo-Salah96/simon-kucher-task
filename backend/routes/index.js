const fs = require('fs');
const path = require('path');
const utils = require('../helpers/utils');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphql');

class Router {
    constructor(app, config) {
        this.app = app;
        this.config = config;
    }

    initialize() {
        this.initializeGraphQl();
    }


    initializeGraphQl() {

        this.app.use(
            '/graphql',
            graphqlHTTP({
                schema: schema,
                graphiql: true,
            }),
        );
    }

}

module.exports = Router;

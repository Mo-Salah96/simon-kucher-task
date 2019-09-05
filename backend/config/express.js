const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const devLogger = require('morgan');

const errors = require('../helpers/errors/index');
const utils = require('../helpers/utils');

module.exports = (app, router, config) => {
    // Disable powered by express
    app.disable('x-powered-by');
    app.disable('etag');

    // Express extensions
    if (utils.inDevelopment()) {
        app.use(devLogger('dev'));
    }

    app.use(cors());
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(compress());


    // Finally we must initialize router
    const routers = new router(app, config);
    routers.initialize();
    // catch 404 and forwarding to error handler
    app.use((req, res, next) => {
        const err = new errors.NotFoundError();
        next(err);
    });

    // Error handling
    app.use((err, req, res, next) => {
        const payload = {
            code: err.code || 0,
            name: err.name,
            message: err.message || 'Error',
        };
        // Set res code based on error code or return 500
        res.statusCode = err.status || 500;
        // ajv errors
        if (err.status && err.status === 400) {
            // Handle ajv errors
            if (Array.isArray(err.message)) {
                payload.details = err.message;
                payload.message = 'validation error(s)';
            }
        }

        payload.stack = err.stack;

        if (utils.inDevelopment()) {
            payload.stack = JSON.stringify(err.stack);
            return res.json(payload);
        }

        res.json(payload);
    });
};

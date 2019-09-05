const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const utils = require('../helpers/utils');
const DB_RETRIES = 30;
const DB_WAIT_TIME = 2000;
const Sequelize = require('sequelize');

class Database {
    constructor() {
        this._initialized = false;
        this._connection = undefined;
        this._retries = 0;

    }

    /**
     * Register all models in ./models directory
     * Note: Does not work recursively
     * @private
     */

    async _registerModels(sequelize) {

        const customers = require('./models/customer')(sequelize, Sequelize);
        const industries = require('./models/industry')(sequelize, Sequelize);
        const profiles = require('./models/profile')(sequelize, Sequelize);
        customers.belongsTo(profiles);
        profiles.hasOne(customers);
        customers.belongsTo(industries);
        sequelize.sync({force: true});

        return {
            customers,
            profiles,
            industries,
        }


    }

    async _connect(config) {

        const sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect,
            operatorsAliases: false,
            pool: config.pool,
        });
        try {
            await sequelize
                .authenticate()
                .then(() => {
                    console.log('Connection has been established successfully.');
                })
                .catch(err => {
                    console.error('Unable to connect to the database:', err);
                });

        } catch (err) {
            if (this._retries >= DB_RETRIES) {
                console.log('Waiting timeout');
                throw err;
            }

            this._retries += 1;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`Waiting for database, Reason: ${err.message}`);
                    resolve(this._connect(config));
                }, DB_WAIT_TIME);
            });
        }
        return sequelize;
    }

    async initialize(dbConfig) {
        if (this._initialized) {
            return;
        }


        // Connect to mongodb
        console.log(dbConfig.host);
        const sequelize = await this._connect(dbConfig);
        // Register models
        const models = await this._registerModels(sequelize);

        this._initialized = true;
        const db = {...models};
        db.Sequelize = Sequelize;
        db.sequelize = sequelize;
        return db;
    }

    get isInitialized() {
        return this._initialized;
    }

}

module.exports = new Database();

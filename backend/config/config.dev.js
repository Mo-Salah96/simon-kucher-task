module.exports = {
    app: {
        version: '0.0.0',
        name: 'Task',
    },
    port: 3000,
    db: {
        database: 'newDB6',
        username: 'SA',
        password: 'This_Is_Passw0rd',
        host: '157.230.104.141',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    },
    NODE_ENV: 'development',
};

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        code: {
            type: Sequelize.INTEGER
        },
        balance: {
            type: Sequelize.INTEGER
        }
    });
    // Customer.sync({force: true});
    return Customer;
};

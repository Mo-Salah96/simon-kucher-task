module.exports = (sequelize, Sequelize) => {
    const Industry = sequelize.define('industry', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
    });
    // Industry.sync({force: true});
    return Industry;
};

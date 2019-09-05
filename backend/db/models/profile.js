module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('profile', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.STRING
        },
        website: {
            type: Sequelize.STRING
        }
    });
    // Profile.sync({force: true});
    return Profile;
}

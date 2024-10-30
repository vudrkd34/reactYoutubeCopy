module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'usertable', 
        {

            username: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true
            },


        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};
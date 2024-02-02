module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'cstmr', 
        {
            name: {
                type: DataTypes.STRING(50),
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
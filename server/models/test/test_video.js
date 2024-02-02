module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'test_video', 
        {
            title: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            url: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            file_name: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            file_path: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            insertDt: {
                type: DataTypes.DATE(),
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
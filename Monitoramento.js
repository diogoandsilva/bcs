"use strict";

module.exports = function(sequelize, DataTypes){

    var Monitoramento = sequelize.define('Monitoramento', {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ip: {
            type: DataTypes.STRING
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defautValue: true,
            allowNull: false

        }
    }, {
        freezeTableName: true
    });
    return Monitoramento;

};

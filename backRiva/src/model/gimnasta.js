import {DataTypes} from 'sequelize';
import { sequelize } from '../database/database.js';

export const Gimnasta = sequelize.define('gimnasta', {
    id_gimnasta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    salto:{
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
    },
    viga:{
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
    },
    paralela:{
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
    },
    suelo:{
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
    },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false
    },
    club:{
        type: DataTypes.STRING,
        allowNull: false
    },
    total:{
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
    },
    nivel:{
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    timestamps: false,
    tableName: "gimnasta"
})
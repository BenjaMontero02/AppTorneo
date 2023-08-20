import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'rivadavia', 'postgres', 'Bm43803168', 
    {
    host: 'localhost',
    dialect:'postgres'
    }
);
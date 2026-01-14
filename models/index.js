const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db.config.js');

// Membuat instance koneksi ke MySQL Laragon
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: config.pool,
        logging: false // Ubah ke console.log jika ingin melihat query SQL yang berjalan
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import Model Item
db.Item = require('./item.js')(sequelize, DataTypes);

module.exports = db;
// Memuat variabel lingkungan dari file .env
require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "inventory_db",
  dialect: process.env.DB_DIALECT || "mysql",
  
  // Konfigurasi tambahan untuk performa (opsional namun disarankan)
  pool: {
    max: 5,         // Jumlah maksimal koneksi terbuka
    min: 0,         // Jumlah minimal koneksi terbuka
    acquire: 30000, // Waktu maksimal (ms) untuk mencoba koneksi sebelum error
    idle: 10000     // Waktu maksimal (ms) koneksi dibiarkan menganggur sebelum ditutup
  }
};
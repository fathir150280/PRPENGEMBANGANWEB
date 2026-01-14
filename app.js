// 1. Import Library Utama
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./models');

// 2. Import Routes
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();

// 3. Konfigurasi Template Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. Middleware Global
app.use(express.json()); // Untuk membaca payload JSON
app.use(express.urlencoded({ extended: true })); // Untuk membaca data dari Form HTML
app.use(cookieParser()); // Untuk membaca token JWT dari Cookie
app.use(express.static(path.join(__dirname, 'public'))); // (Opsional) Untuk file CSS/JS statis

// 5. Pendaftaran Route
app.use('/', authRoutes);           // Route Login & Logout
app.use('/dashboard', inventoryRoutes); // Route Inventory (Terproteksi JWT)

// TAMBAHKAN INI: Handler untuk halaman utama (/)
app.get('/', (req, res) => {
    res.redirect('/login'); // Jika buka localhost:3000, langsung lempar ke login
});

// 6. Sinkronisasi Database & Jalankan Server
const PORT = process.env.PORT || 3000;

// db.sequelize.sync() akan membuat tabel secara otomatis di MySQL jika belum ada
db.sequelize.sync({ force: false }).then(() => {
    console.log('--- Database connected and synchronized ---');
    app.listen(PORT, () => {
        console.log(`--- Server is running on http://localhost:${PORT} ---`);
    });
}).catch((err) => {
    console.error('--- Unable to connect to the database: ---', err);
});
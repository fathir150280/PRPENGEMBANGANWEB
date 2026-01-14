const jwt = require('jsonwebtoken');

// 1. Middleware Autentikasi (Cek Token)
exports.verifyToken = (req, res, next) => {
    // Mengambil token dari cookie (pastikan cookie-parser sudah terpasang di app.js)
    const token = req.cookies.token;

    // Jika tidak ada token, tendang kembali ke halaman login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifikasi token menggunakan secret key dari .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Simpan data payload (username & role) ke objek req agar bisa dipakai di Controller
        req.user = decoded; 
        
        // Simpan ke res.locals agar variabel 'user' bisa langsung dipanggil di file EJS
        res.locals.user = decoded; 
        
        next(); // Lanjut ke proses berikutnya
    } catch (err) {
        // Jika token tidak valid atau expired, hapus cookie dan login ulang
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

// 2. Middleware Otorisasi (Cek Peran/Role)
// Digunakan khusus untuk route yang hanya boleh diakses Manager
exports.isManager = (req, res, next) => {
    // req.user didapat dari middleware verifyToken sebelumnya
    if (req.user && req.user.role === 'manager') {
        next(); // Jika manager, izinkan akses
    } else {
        // Jika admin atau lainnya, blokir akses dengan status 403 (Forbidden)
        return res.status(403).send('Akses Ditolak: Anda tidak memiliki izin untuk akses fitur ini (Hanya Manager).');
    }
};
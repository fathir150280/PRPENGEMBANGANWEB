const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Halaman Login (Menampilkan Form)
router.get('/login', (req, res) => {
    res.render('login');
});

// Proses Login (Menerima input data dan memberikan JWT)
router.post('/login', authController.login);

// Logout (Menghapus Cookie Token)
router.get('/logout', authController.logout);

module.exports = router;
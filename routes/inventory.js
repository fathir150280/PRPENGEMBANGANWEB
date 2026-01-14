const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { verifyToken, isManager } = require('../middleware/auth');

// PROTEKSI: Terapkan middleware verifyToken pada SEMUA route dashboard
router.use(verifyToken);

// 1. Tampilan Utama Dashboard (Bisa diakses Manager & Admin)
router.get('/', itemController.getAllItems);

// 2. Tampilan Form Tambah (HANYA Manager)
router.get('/add', isManager, (req, res) => {
    res.render('add'); 
});

// 3. Proses Tambah Barang (HANYA Manager) - Blokir di server
router.post('/add', isManager, itemController.createItem);

// 4. Tampilan Form Edit (Bisa diakses Manager & Admin)
router.get('/edit/:id', async (req, res) => {
    const { Item } = require('../models');
    const item = await Item.findByPk(req.params.id);
    res.render('edit', { item });
});

// 5. Proses Update Barang (Bisa diakses Manager & Admin)
router.post('/edit/:id', itemController.updateItem);

// 6. Proses Hapus/Soft Delete (HANYA Manager) - Blokir di server
router.post('/delete/:id', isManager, itemController.softDelete);

module.exports = router;
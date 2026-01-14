const { Item } = require('../models');

// Menampilkan data di Dashboard
exports.getAllItems = async (req, res) => {
    try {
        // INSTRUKSI: Data dengan is_active = 0 harus disembunyikan
        const items = await Item.findAll({ 
            where: { is_active: 1 } 
        });
        
        // Kirim data barang ke views/dashboard.ejs
        res.render('dashboard', { items });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create Item (Tambah Barang)
exports.createItem = async (req, res) => {
    try {
        // INSTRUKSI: created_by diambil otomatis dari req.user.username (JWT)
        await Item.create({
            item_name: req.body.item_name,
            category: req.body.category,
            price: req.body.price,
            stock_qty: req.body.stock_qty,
            min_stock: req.body.min_stock,
            storage_location: req.body.storage_location,
            created_by: req.user.username, // Audit Trail Otomatis
            is_active: 1
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Gagal menambah data");
    }
};

// Update Item (Edit Barang)
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        // INSTRUKSI: updated_by diambil otomatis dari req.user.username (JWT)
        await Item.update({
            ...req.body,
            updated_by: req.user.username // Audit Trail Otomatis
        }, { 
            where: { id } 
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Gagal mengupdate data");
    }
};

// Soft Delete (Discontinue)
exports.softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        // INSTRUKSI: TIDAK BOLEH SQL DELETE. Gunakan UPDATE is_active = 0
        await Item.update(
            { is_active: 0 }, 
            { where: { id } }
        );
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Gagal menonaktifkan barang");
    }
};
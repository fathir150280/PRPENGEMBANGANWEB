const jwt = require('jsonwebtoken');

// Data dummy sesuai instruksi soal
const users = [
    { username: 'manager', password: '12345', role: 'manager' },
    { username: 'admin', password: '123', role: 'admin' }
];

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    // Cari user berdasarkan username & password
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send('Username atau Password Salah!');
    }

    // Token WAJIB memuat payload username dan role
    const token = jwt.sign(
        { username: user.username, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    // Simpan token di Cookie agar bisa dibaca middleware verifyToken
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};
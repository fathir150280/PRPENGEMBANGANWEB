module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: DataTypes.STRING,
        price: DataTypes.INTEGER,
        stock_qty: DataTypes.INTEGER,
        min_stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        storage_location: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1 // Default 1: Aktif, 0: Discontinue
        },
        created_by: DataTypes.STRING, // Audit Trail: Username pembuat
        updated_by: DataTypes.STRING  // Audit Trail: Username pengubah
    }, {
        // INSTRUKSI: Aktifkan timestamps untuk menangani created_at & updated_at
        timestamps: true,
        tableName: 'items',
        underscored: true // Mengubah createdAt menjadi created_at di DB
    });

    return Item;
};
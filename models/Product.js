const mongoose = require('mongoose');

var Squema = mongoose.Schema;

var ProductoSchema = new Squema({
    Name: { type: String, required: [true, 'el nombre es nesesario'] },
    Description: { type: String },
    SalePrice: { type: Number, required: [true, 'El precio de venta es obligatorio'] },
    PurchasePrice: { type: Number, required: [true, 'El precio de compra es obligatorio'] },
    Category: { type: esquema.Types.ObjectId, ref: 'Categoria', required: [true, 'El codigo de la categoria es nesesario'] },
    StockRole: { type: String, required: true, default: '0.00' },
    estado: { type: Boolean, default: true },
    Img: { type: String }
});

module.exports = mongoose.model('Producto', ProductoSchema);
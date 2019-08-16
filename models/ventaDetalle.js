const mongoose = require('mongoose');

var esquema = mongoose.Schema;

let detalleEsquema = new esquema({
    venta:{type:esquema.Types.ObjectId,ref:'Venta',required:[true,'El dato es nesesario']},
    //precio:{type:Number,required:[true,'El dato es nesesario']},
    cantidad:{type:Number,required:[true,'el dato es nesesario']},
    producto:{type:esquema.Types.ObjectId,ref:'Producto',required:[true,'El dato es nesesario']},
    
},{ Collection: 'ventaDetalle' });

module.exports = mongoose.model('DetalleVenta',detalleEsquema);
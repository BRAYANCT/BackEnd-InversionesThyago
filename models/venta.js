const mongoose = require('mongoose');

var esquema = mongoose.Schema;

var ventaEsquema = new esquema({
    Fecha:{type:String,required:[true,'este dato es nesesario']},
    usuario:{type:esquema.Types.ObjectId,ref:'Usuario',required:[true,'Este dato es ensesario']},
    boleta:{type:String},
    codigo:{type:String,required:[true,'el codigo esnesesario']},
    estado:{type:String,default:'espera'},
    monto:{type:Number,required:[true,'El monto es nesesario']},
    numero:{type:Number,default:false},
    serie:{type:Number,default:false,},
     sede: { type: Schema.Types.ObjectId, ref: 'Sede', required: [true, 'el id hospital es un campo obligatorio'] }

},{ Collection: 'ventas' });

module.exports = mongoose.model('ventas', ventaEsquema);

 

const mongoose= require('mongoose');
const detailimportproduct= new mongoose.Schema({
    idimportproduct: String,
    idproduct: String,
    quantity: Number,
    price: Number,
})
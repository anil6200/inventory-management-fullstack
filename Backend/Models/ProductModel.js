const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,    // relate to User
        required: true, 
        ref: 'User' },
         
    title: 
    { type: String, 
      required: true },

    description: 
    { type: String, 
    required: true },

    price: 
    { type: Number, 
    required: true },

    category: 
    { type: String, 
    required: true },

    brand: 
    { type: String, 
    required: true },

    thumbnail:
    { url:String ,
    public_id:String
    }, 

    stock: 
    { type: Number, 
    required: true },
    
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
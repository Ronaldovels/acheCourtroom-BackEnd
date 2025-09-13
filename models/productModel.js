import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    data: Date,
    tipo: String,
    aprovacao: Boolean,
    status: String,
    veracidade: String,
    imgLabel: String,
    imgNormal: String
})
    
const product = mongoose.model('Product', productSchema);
export default product;
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    data: Date,
    tipo: String,
    aprovacao: Boolean,
    status: String,
    veracidade: String,
    imgLabel: String,
    imgNormal: String,
    contagem: {
        type: String,
        enum: ['pendente', 'concluida'],
        required: false
    },
    faltando: {
        type: Number,
        required: false
    },
    contem: {
        type: Number,
        required: false
    }
})
    
const product = mongoose.model('Product', productSchema);
export default product;
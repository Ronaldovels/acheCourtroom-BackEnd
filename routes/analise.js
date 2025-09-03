import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
const router = express.Router();


router.post('/add', async (req, res) => {
    try {
        const { id, data, aprovacao, status, veracidade, imgLabel, imgNormal } = req.body;
        
        const newProduct = new Product({
            id,
            data,
            aprovacao,
            status,
            veracidade,
            imgLabel,
            imgNormal
        })

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });

    } catch (error) {
        console.error("Erro ao criar novo produto: ", error.message);
        res.status(500).json({message: 'Erro interno ao criar produto.'})
    }
})

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar produtos'});
    }
})

export default router;
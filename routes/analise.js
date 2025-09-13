import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
const router = express.Router();


router.post('/add', async (req, res) => {
    try {
        const { id, data, tipo, aprovacao, status, veracidade, imgLabel, imgNormal } = req.body;
        
        const newProduct = new Product({
            id,
            data,
            tipo,
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

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { aprovacao, status, veracidade, tipo} = req.body;
        const updatedProduct = await Product.findOneAndUpdate(
            { id: id },
            { aprovacao, status, veracidade, tipo},
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Erro ao atualizar produto: ", error.message);
        res.status(500).json({message: 'Erro interno ao atualizar produto.'})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findOneAndDelete({ id: id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error("Erro ao deletar produto: ", error.message);
        res.status(500).json({message: 'Erro interno ao deletar produto.'})
    }
})

export default router;
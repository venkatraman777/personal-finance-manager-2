const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Add a transaction
router.post('/', async (req, res) => {
    try {
        const { type, amount, category } = req.body;
        const transaction = new Transaction({ type, amount, category });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

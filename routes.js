const express = require('express');
const Keuangan = require('./models/keuangan_model');

const router = express.Router();

router.get('/', async (req, res) => {
    const keuangans = await Keuangan.find();
    res.json(keuangans);
});

router.post('/', async (req, res) => {
    const keuangan = new Keuangan(req.body);
    await keuangan.save();
    res.json(keuangan);
});

module.exports = router;
const express = require('express');
const Mahasiswa = require('./models/mahasiswa_model');

const router = express.Router();

router.get('/', async (req, res) => {
    const mahasiswas = await Mahasiswa.find();
    res.json(mahasiswas);
});

router.post('/', async (req, res) => {
    const mahasiswa = new Mahasiswa(req.body);
    await mahasiswa.save();
    res.json(mahasiswa);
});

module.exports = router;
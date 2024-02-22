const express = require('express');
const response = require('./response');
const Keuangan = require('./models/keuangan_model');

const router = express.Router();

router.get('/', async (req, res) => {
    const keuangans = await Keuangan.find();
    res.json(keuangans);
});

router.post('/', async (req, res) => {
    const keuangan = new Keuangan(req.body);

    if (keuangan.nominal == 0) {
        response(res, 401, 'Nominal Tidak Boleh Kosong', '');
        return;
    }

    await keuangan.save();
    response(res, 200, 'Berhasil Tambah Data', '');
});

module.exports = router;
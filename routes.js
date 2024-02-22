const express = require('express');
const response = require('./response');
const Keuangan = require('./models/keuangan_model');

const router = express.Router();

router.get('/', async (req, res) => {
    const keuangans = await Keuangan.find();
    const total = await Keuangan.aggregate([
        {
            $group: {
                _id: '$jenis',
                total: { $sum: '$nominal' },
            },
        },
    ]);

    let pemasukan = total.find(jenis => jenis._id === 'Pemasukan');
    let pengeluaran = total.find(jenis => jenis._id === "Pengeluaran");

    const totalPemasukan = pemasukan ? pemasukan.total : 0;
    const totalPengeluaran = pengeluaran ? pengeluaran.total : 0;

    const data = [
        {
            'pemasukan': totalPemasukan,
            'pengeluaran': totalPengeluaran,
        },
        keuangans,
    ];

    response(res, 200, 'Berhasil Ambil Data', data);
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
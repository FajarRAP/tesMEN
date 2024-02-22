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

    const totalPemasukan = total[0]['total'];
    const totalPengeluaran = total[1]['total'];

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
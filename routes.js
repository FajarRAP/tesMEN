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

    const keuangansFormatted = keuangans.map((e) => {
        const dateFormatted = e.tanggal.toLocaleDateString('en-GB').split('/').join('-');
        return {
            ...e._doc,
            tanggal: dateFormatted
        }
    });

    const data = [
        {
            'pemasukan': totalPemasukan,
            'pengeluaran': totalPengeluaran,
        },
        keuangansFormatted,
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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const update = await Keuangan.findById(id);
        await update.updateOne(body);
        if (update) {
            response(res, 200, 'Berhasil Sunting Data', '');
        } else {
            response(res, 404, 'ID tidak ditemukan', '');
        }
    } catch (error) {
        response(res, 500, error.message, '');
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const hapus = await Keuangan.findByIdAndDelete(id);
        if (hapus) {
            response(res, 200, 'Berhasil Hapus Data', '');
        } else {
            response(res, 404, 'ID tidak ditemukan', '');
        }
        return;
    } catch (error) {
        response(res, 500, error.message, '');
    }
});

module.exports = router;
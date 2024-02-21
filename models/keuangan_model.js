const mongoose = require('mongoose');
const schema = mongoose.Schema;

const keteranganEnum = [
    'Belanja',
    'Bensin',
    'Cukur',
    'Badminton',
    'Paket Data',
    'Hutang',
    'Biasa'
]

const jenisEnum = [
    'Pemasukan',
    'Pengeluaran'
]

const keuanganSchema = new schema({
    'nama': String,
    'detail_nama': String,
    'keterangan': {
        type: String,
        enum: keteranganEnum
    },
    'nominal': Number,
    'tanggal': Date,
    'jenis': {
        type: String,
        enum: jenisEnum
    }
});

const Keuangan = mongoose.model('keuangan', keuanganSchema);
module.exports = Keuangan;
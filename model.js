const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mahasiswaSchema = new schema({
    'nama': String,
    'nim': String,
    'email': String,
});

const Mahasiswa = mongoose.model('mahasiswa', mahasiswaSchema);

module.exports = Mahasiswa;
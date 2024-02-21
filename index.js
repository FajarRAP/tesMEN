const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', router);

const port = 3000;

mongoose.connect('mongodb://localhost:27017/tesDatabase');

const db = mongoose.connection;
db.on('error', () => { console.log('Koneksi Error'); });
db.on('open', () => {
    console.log('Berhasil Koneksi ke MongoDB');
    app.listen(port, () => { console.log(`Jalan di port ${port}`); });
});



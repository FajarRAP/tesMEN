require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/keuangan', router);

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Koneksi MongoDB Berhasil : ${connection.connection.host}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Jalan di PORT ${PORT}`); });
});



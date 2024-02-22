const response = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        "statusCode": statusCode,
        "message": message,
        "total_pengeluaran": data[1],
        "datas": data[0],
    });
};

module.exports = response;
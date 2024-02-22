const response = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        "statusCode": statusCode,
        "message": message,
        "total": data[0],
        "datas": data[1],
    });
};

module.exports = response;
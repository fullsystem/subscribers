let response;

exports.lambdaHandler = async (event, context, callback) => {
    const response = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    try {
        response(null, { message: 'Subscribers' })
    } catch (err) {
        console.log(err);
        response(new Error(err))
    }
};

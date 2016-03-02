var request = require('request');
var retry = require('retry');

function retryRequest(address, cb) {
    var operation = retry.operation();

    operation.attempt(function (currentAttempt) {
        console.log('(re-)starting connection attempt...');
        request(address, function (error, response, body) {
            if (operation.retry(error)) {
                return;
            }

            console.log('connection attempt was successful. HTTP Body: ' + body)
            if (cb) cb(err ? operation.mainError() : null, body);
        });
    });
}

module.exports = {
    connect: retryRequest
};
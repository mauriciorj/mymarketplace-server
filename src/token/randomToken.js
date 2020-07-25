var randtoken = require('rand-token');

exports.generateRandomToken = function () {

    var token = randtoken.generate(16);

    return token;
}
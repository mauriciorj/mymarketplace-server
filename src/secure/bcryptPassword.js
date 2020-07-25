const bcrypt = require('bcrypt');
var saltRounds = 10;

exports.hashPassword = function(myPlaintextPassword){
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    return hash;
}

exports.checkPassword = function(loginPassword, userPassword){

    const checkIsValid = bcrypt.compareSync(loginPassword, userPassword);

    return checkIsValid;
}
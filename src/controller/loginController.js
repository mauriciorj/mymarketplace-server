let UserInformation = require('../model/userInformation');
var recoveryEmailSender = require('../emailSender/recoveryEmailSender');
var newEmailUpdated = require('../emailSender/newEmailUpdated');
var randomToken = require('../token/randomToken');
var hashFunction = require('../secure/bcryptPassword');

exports.user_recoveryEmail = function (req, res) {
    let email = req.params.email;
    UserInformation.find({ "userPassInfo.userNameLogin": email }, function (err, userInformation) {
        if (err) {
            res.json(false)
        } else {
            if (userInformation.length === 0) {
                res.json(false)
            } else {
                //Generate a new token
                var newToken = randomToken.generateRandomToken();

                //Get the id
                var myId = userInformation[0].id;

                //Create and expire date with 30 minutes duration
                var newDate = new Date();
                newDate.setMinutes(newDate.getMinutes() + 30)

                //Update token on the userInformation
                UserInformation.updateOne({ "_id": myId }, { "recoveryPassword.token": newToken, "recoveryPassword.expireDate": newDate }, function (err) {
                    if (err) {
                        //console.log(err);
                        res.json(false)
                    }
                });

                //Send the email with link to reset user's password
                recoveryEmailSender.recoveryEmailSenderFunction(email, newToken);
                res.json(true);
            }
        }
    });
};

exports.user_checkTokenExpDate = function(req, res){
    let token = req.query.token;

    UserInformation.find({ "recoveryPassword.token": token }, function(err, userInformation){
        if (err) {
            res.json(false);
        } else {
            if(userInformation.length === 0){
                res.json('not found');
            }
            else if(Date.now() > userInformation[0].recoveryPassword.expireDate){
                res.json(false)
            }else{
                res.json(true)
            }
        }
    });
};

exports.user_insertNewPassword = function(req, res){
    let token = req.query.token;
    let newPassword = req.query.newpass;

    UserInformation.find({ "recoveryPassword.token": token }, function(err, userInformation){
        if(err){
            res.json(false)
        }else{
            //Encrypt the email using bcrypt
            var hasPassword = hashFunction.hashPassword(newPassword);

            //Update the email value
            UserInformation.updateOne({ "recoveryPassword.token": token }, { "userPassInfo.passUserLogin": hasPassword }, function (err) {
                if (err) {
                    res.json(err);
                }
            });

            //Send the email informing the password was changed successfully
            newEmailUpdated.resetPasswordSuccess(userInformation[0].userPassInfo.userNameLogin);
        
            res.json(true);
        }
    });
};

exports.user_login = function(req, res){
    let email = req.query.user;
    let password = req.query.passuser;

    UserInformation.find({ "userPassInfo.userNameLogin": email }, function (err, userInformation) {
        if(err){
            res.json(false)
        }else if(userInformation.length === 0){
            res.json(false);
        }else{
            var originalPassword = userInformation[0].userPassInfo.passUserLogin;

            var passwordIsValid = hashFunction.checkPassword(password, originalPassword)
            
            if(passwordIsValid){
                res.json(true);
            }else{
                res.json(false);
            }
        }
    })
}
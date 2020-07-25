let UserInformation = require('../model/userInformation')
var hashFunction = require('../secure/bcryptPassword');

exports.user_addNewUserPostMan = function(req, res) {
    let userInformation = new UserInformation(req.body);
    userInformation.save()
        .then(userInformation => {
            res.status(200).json('User added successfully');
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.user_addNewUser = function(req, res) {

    //Encrypt the email using bcrypt
    var hasPassword = hashFunction.hashPassword(req.body.password);

    let userRegister = {
        userPersonalInformation: {
            userFirstName: req.body.firstName,
            userLastName: req.body.lastName,
            userGender: req.body.gender,
            mobileUser: req.body.one+req.body.mobileTwo+req.body.mobileThree
        },
        userLocation: {
            countryUser: req.body.countryDrop,
            stateUser: req.body.provinceDrop,
            cityUser: req.body.city,
            addressUserLineOne: req.body.addressLineOne,
            addressUserLineTwo: null,
            zipCodeUser: req.body.zipCode
        },
        userLoginValidation:{
            userEmailCheck: false,
            userEmailCheckDateSend: null
        }, 
        userAccountStatus: 'toBeActivated',
        userPassInfo: {
            userNameLogin: req.body.email,
            passUserLogin: hasPassword
        },
        recoveryPassword: {
            token: null,
            expireDate: null
          },
    };

    //console.log(userRegister)

    let userInformation = new UserInformation(userRegister);
    userInformation.save()
        .then(userInformation => {
            res.status(200).json(true);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};
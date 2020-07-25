const mongoose = require('mongoose');
mongoose.pluralize(null);
const Schema = mongoose.Schema;

let UserInformationSchema = new Schema({
    userPersonalInformation: {
        userFirstName: { type: String, required: true },
        userLastName: { type: String, required: true },
        userGender: { type: String },
        mobileUser: { type: String, required: true }
    },
    userLocation: {
        countryUser: { type: String, required: true },
        stateUser: { type: String, required: true },
        cityUser: { type: String, required: true },
        addressUserLineOne: { type: String, required: true },
        addressUserLineTwo: { type: String },
        zipCodeUser: { type: String, required: true }
    },
    userLoginValidation:{
        userEmailCheck: { type: Boolean },
        userEmailCheckDateSend: { type: Date }
    },
    userRegisterCreated: { type: Date, required: true, default: Date.now }, //2002-12-09T00:00:00.000Z
    userAccountStatus: { type: String, required: true },
    userPassInfo: {
        userNameLogin: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        passUserLogin: {
            type: String,
            required: true
        }
    },
    recoveryPassword: {
        token: { type: String },
        expireDate: { type: Date, default: null }
      },
});

module.exports = mongoose.model("userInformation", UserInformationSchema, "userInformation");
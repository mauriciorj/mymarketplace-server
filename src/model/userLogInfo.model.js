const mongoose = require('mongoose');
mongoose.pluralize(null);
const Schema = mongoose.Schema;

let UserLogInfoSchema = new Schema({
    userPassInfo: {
        userNameLogin: { type: String, required: true },
    },
    securityInfo:{
        ipAddress: { type: String },
        requestDate: { type: Date, required: true, default: Date.now }, //2002-12-09T00:00:00.000Z
        actionrequested: { type: String, required: true },
    }
});

module.exports = mongoose.model("userLogInfo", UserLogInfoSchema, "userLogInfo");
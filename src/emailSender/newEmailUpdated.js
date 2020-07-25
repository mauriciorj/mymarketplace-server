var nodemailer = require('nodemailer');

exports.resetPasswordSuccess = function (email) {

    //console.log(email);

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    
    var mailTo = "thehultstore@gmail.com";

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password was changed successfully',
        html: `  <!doctype html>
                <html ⚡4email>
                    <head>
                        <meta charset="utf-8">
                        <style type="text/css">
                        .mainDiv{
                            margin: 0 auto;
                            width: 100%;
                            text-align: center;
                            text-decoration: none;
                            color: black;
                        }
                        </style>
                    </head>
                    <body>
                    <div class="mainDiv">
                    <h1>Your password was changed successfully.</h1>
                    <p>&nbsp;</p>
                    <hr />
                    <p>&nbsp;</p>
                    <p>If you didn't request to reset the password, please <a href="mailto:${mailTo}">contact us</a> asap!</p>
                    <p>Any problem, please <a href="mailto:${mailTo}">contact us.</a></p>
                    </div>
                    </body>
                </html>`,
        amp: `  <!doctype html>
                <html ⚡4email>
                    <head>
                        <meta charset="utf-8">
                        <style type="text/css">
                        .mainDiv{
                            margin: 0 auto;
                            width: 100%;
                            text-align: center;
                            text-decoration: none;
                            color: black;
                        }
                        </style>
                    </head>
                    <body>
                    <div class="mainDiv">
                    <h3>Your password was changed successfully!</h3>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <hr />
                    <p>&nbsp;</p>
                    <p>If you didn't request to reset the password, please <a href="mailto:${mailTo}">contact us</a> asap!</p>
                    <p>Any problem, please <a href="mailto:${mailTo}">contact us.</a></p>
                    </div>
                    </body>
                </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
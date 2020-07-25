var nodemailer = require('nodemailer');

exports.recoveryEmailSenderFunction = function (email, token) {

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
        subject: 'Recovery Password',
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
                        
                        .myButton {
                            background:    #3d85c6;
                            border-radius: 11px;
                            padding:       20px 45px;
                            color:         #ffffff !important;
                            display:       inline-block;
                            font:          normal bold 1rem "Open Sans", sans-serif;
                            text-align:    center;
                            text-decoration: none;
                        }
                        .myButton:hover {
                            background:    #15629e;
                            border-radius: 11px;
                            padding:       20px 45px;
                            color:         #ffffff !important;
                            display:       inline-block;
                            font:          normal bold 1rem "Open Sans", sans-serif;
                            text-align:    center;
                            text-decoration: none;
                        }
                        .myButton:active {
                            background:    #3d85c6;
                            border-radius: 11px;
                            padding:       20px 45px;
                            color:         #ffffff !important;
                            display:       inline-block;
                            font:          normal bold 1rem "Open Sans", sans-serif;
                            text-align:    center;
                            text-decoration: none;
                        }
                        </style>
                    </head>
                    <body>
                    <div class="mainDiv">
                    <h1>This email is to recovery your password.</h1>
                    <p>&nbsp;</p>
                    <p><h3>Please click on the link below to reset your password.</h3></p>
                    <a class="myButton" href="http://localhost:3000/insertnewpassword?token=${token}">Reset my password</a>
                    <p>&nbsp;</p>
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
                        
                        .myButton {
                            background:    #3d85c6;
                            border-radius: 11px;
                            padding:       20px 45px;
                            color:         #ffffff !important;
                            display:       inline-block;
                            font:          normal bold 1rem "Open Sans", sans-serif;
                            text-align:    center;
                            text-decoration: none;
                        }
                        .myButton:hover {
                            background:    #15629e;
                            border-radius: 11px;
                            padding:       20px 45px;
                            color:         #ffffff !important;
                            display:       inline-block;
                            font:          normal bold 1rem "Open Sans", sans-serif;
                            text-align:    center;
                            text-decoration: none;
                        }
                        .myButton:active {
                            background:    #3d85c6;
                            border-radius: 11px;
                            padding:       20px 45px;
                            color:         #ffffff !important;
                            display:       inline-block;
                            font:          normal bold 1rem "Open Sans", sans-serif;
                            text-align:    center;
                            text-decoration: none;
                        }
                        </style>
                    </head>
                    <body>
                    <div class="mainDiv">
                    <h3>This email is to recovery your password.</h3>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p><h5>Please click on the link below to reset your password.</h5></p>
                    <a class="myButton" href="http://localhost:3000/user/recoveryPassword/token=${token}">Reset my password</a>
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
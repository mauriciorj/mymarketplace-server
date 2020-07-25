var express = require('express');
var router = express.Router();

// Require controller modules.
var login_controller = require('../controller/loginController');
var user_controller = require('../controller/userController');

/************************ 
 RECOVERY PASSWORD ROUTES
*************************/

// GET all users
router.get('/recoverypassword/:email', login_controller.user_recoveryEmail);

router.get('/checkTokenValidity', login_controller.user_checkTokenExpDate);

router.post('/insertnewpassword', login_controller.user_insertNewPassword);


/************************ 
        USER LOGIN
*************************/

router.get('/login', login_controller.user_login);



/************************ 
         USER ADD
*************************/

router.post('/user/addPostman', user_controller.user_addNewUserPostMan);

router.post('/user/add', user_controller.user_addNewUser);



module.exports = router;
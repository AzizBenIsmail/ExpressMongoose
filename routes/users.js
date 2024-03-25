var express = require('express');
var router = express.Router();
const auth = require("../controllers/authController")
const upload = require("../middlewares/uploadFile")
const {requireAuthUser} = require("../middlewares/authmiddlewares")

router.get('/',requireAuthUser,auth.getUsers );

router.get('/logOut',requireAuthUser,auth.logout );

router.get('/searchUsersByName',auth.searchUsersByName );  //searchUsersByName?data=aziz

router.get('/getUsersSortByAge',auth.getUsersSortByAge ); 

router.get('/getUsersSortByAgeDesc',auth.getUsersSortByAgeDesc ); 

router.get('/:id',auth.getUserByID );

router.post('/signup',auth.signupclient );

router.post('/loginUser',auth.login );


router.post('/',auth.addUser );

router.post('/addClient',upload.single("image_user"),auth.addClient );

router.delete('/:id',auth.deleteUser );

router.put('/:id',auth.updateUser );




module.exports = router;

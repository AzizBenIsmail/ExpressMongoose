var express = require('express');
var router = express.Router();
const auth = require("../controllers/authController")
const upload = require("../middlewares/uploadFile")

router.get('/',auth.getUsers );

router.get('/searchUsersByName',auth.searchUsersByName );  //searchUsersByName?data=aziz

router.get('/getUsersSortByAge',auth.getUsersSortByAge ); 

router.get('/getUsersSortByAgeDesc',auth.getUsersSortByAgeDesc ); 

router.get('/:id',auth.getUserByID );

router.post('/',auth.addUser );

router.post('/addClient',upload.single("image_user"),auth.addClient );

router.delete('/:id',auth.deleteUser );

router.put('/:id',auth.updateUser );




module.exports = router;

const express=require('express')
const router=express.Router();
const {registeruser,loginuser,currentuser}=require('../controllers/userController');
const validateToken=require('../middleware/validateTokenHandler')

router.post("/Register",registeruser);

router.post("/login",loginuser)

router.get("/current",validateToken,currentuser);

module.exports=router; 
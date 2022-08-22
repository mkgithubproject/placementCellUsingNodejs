const express=require('express');
const passport=require('passport');
const router=express.Router();
const studentController=require('../controllers/student_controller');
router.get('/students_list',passport.checkAuthentication,studentController.listOfStudents);
router.post('/add',passport.checkAuthentication,studentController.add);
router.get('/download',passport.checkAuthentication,studentController.download);

module.exports=router;
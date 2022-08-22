const { model } = require('mongoose');
const Interview = require('../models/interview');
const Student = require('../models/student');

module.exports.listOfInterviews = async function (req, res) {
    try {
        const interviewList = await Interview.find({});
        const studentList = await Student.find({});
        res.render('interviews', {
            title: 'list of interviews',
            interviewList: interviewList,
            studentsData: studentList
        });
        return;
    }
    catch (err) {
        req.flash('error', err);
        return;
    }

}
module.exports.add = function (req, res) {
    Interview.create({ company_name: req.body.company, date_time: req.body.interiewDate }, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
            return;
        }
        req.flash('success', "Interview Added");
        return res.redirect('back');
    });
}
module.exports.allocate = async function (req, res) {
    try{
        const interview = await Interview.findById(req.body.i_id).populate('students');
        const interviewStudentList=interview.students;
        for(std of interviewStudentList){
            if(std.id==req.body.s_id){
                res.status(200).json({ "message": "Interview Already allocated for this student" });
                return;
            }
        }
        const student=await Student.findById(req.body.s_id);
        interview.students.push(req.body.s_id);
        student.interviews.push(req.body.i_id);
        interview.save();
        student.save();
        res.status(200).json({ "message": "Interview Allocated to a Student" });
        return;
    }catch(err){
        res.status(204).json({"error":err.message});
        console.log(err);
        return;
    }
    

}
module.exports.getAllocatedStudents=async function(req,res){
    try{
     const interview=await Interview.findById(req.body.i_id).populate('students');
     res.status(200).json(interview);
    return;
    }catch(err){
        res.status(204).json({"error":err.message});
        console.log(err);
        return;
    }
}

module.exports.assignResultToDB=async function(req,res){
    const student=await Student.findById(req.body.s_id).populate('interviews');
    const interviewsArray=student.interviews;
    let index=-1;
    for(let i=0;i<interviewsArray.length;i++ ){
        if(interviewsArray[i].id==req.body.i_id){
            index=i;
            break;
        }
    }
    student.result[index]=req.body.result;
    if(req.body.result=='PASS'){
        student.student_details.status="PLACED";
    }
    student.save();
    return res.status(200).json({"message":"result updated"});
    
}

const Student = require('../models/student');
const { downloadResource } = require('../config/csv_download');
module.exports.listOfStudents = async function (req, res) {
    try {
        const studentList = await Student.find({}).populate('interviews');
        res.render('students', {
            title: 'list of students',
            studentList: studentList
        });
    } catch (err) {
        console.log(err);
        req.flash("error", err);
        res.redirect('back');
        return;
    }

    return;
}
module.exports.add = async function (req, res) {
    try {
        const student = await Student.findOne({ 'student_details.userName': req.body.userName });
        if (student) {
            req.flash("success", "student already added");
            res.redirect('back');
            return;
        }
        const createStudent = await Student.create({
            batch: req.body.batch, student_details: {
                userName: req.body.userName, college: req.body.college, name: req.body.name
            }, course_scores: { dsa: req.body.dsa_score, webD: req.body.web_score, react: req.body.react_score }

        });
        req.flash("success", "student added");
        res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        console.log(err.message);
        return;
    }
    return;
}
module.exports.download = async function (req, res) {
    const fields = [
        {
            label: 'Student id,',
            value: 'id'
        },
        {
            label: 'student name',
            value: 'student_details.name'
        },
        {
            label: 'student college',
            value: 'student_details.college'
        },
        {
            label: 'Student batch,',
            value: 'batch'
        },
        {
            label: 'student status',
            value: 'student_details.status'
        },
        {
            label: 'DSA Final Score',
            value: 'course_scores.dsa'
        },
        {
            label: 'WebD Final Score',
            value: 'course_scores.webD'
        },
        {
            label: 'React Final Score',
            value: 'course_scores.react'
        },
        {
            label: 'interview date',
            value: 'date_time'

        },
        {
            label: 'interview company',
            value: 'company'

        },
        {
            label: 'interview result',
            value: 'result'

        }
    ];
    const data = await Student.find({}).populate('interviews');
    
   // console.log(data);
    for(let i=0;i<data.length;i++){
        let company_names=[];
        let date_time=[];
        for(let j=0;j<data[i].interviews.length;j++){
           company_names.push(data[i].interviews[j].company_name);
        }
        for(let j=0;j<data[i].interviews.length;j++){
            date_time.push(data[i].interviews[j].date_time);
         }
        data[i].company=company_names;
        data[i].date_time=date_time;
    }
    return downloadResource(res, 'students.csv', fields, data);
}
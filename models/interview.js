const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    date_time: {
        type: String,
        required: true,
    },
    students: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Student'
        }

    ],
    
})
const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;
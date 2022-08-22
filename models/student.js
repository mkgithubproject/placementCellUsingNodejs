const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true,
  },
  student_details: {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PLACED', 'NOT_PLACED'],
      default: 'NOT_PLACED',
    },
  },
  course_scores: {
    dsa: {
      type: Number,
      required: true,
    },
    webD: {
      type: Number,
      required: true,
    },
    react: {
      type: Number,
      required: true,
    },
  },
  interviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Interview',
    },


  ],
  result: [{
    type: String,
    enum: ['PASS', 'FAIL', 'ON_HOLD', 'DID_NOT_ATTEMPT',null],
    default: null,
}
]

})
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
  firstName : {
    type: String,
    required: true
   
  },
  lastName: {
    type: String,
    required: true
    
  },
  age:{
     type : Number,
    // required:true
    },
  date:{
    type: Date,
		default: Date.now
  }
});

var Students = mongoose.model('Students', StudentSchema);
module.exports = Students;
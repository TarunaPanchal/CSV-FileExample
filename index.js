var app = require('express')();
var fileUpload = require('express-fileupload');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var Student = require('./Student');;
mongoose.connect('mongodb://localhost/CSVFile');
app.use(fileUpload());
//var upload = require('./upload.js');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.post('/', function (req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	
	var studentFile = req.files.file;

	var students = [];
    
	csv
	 .fromString(studentFile.data.toString(),  {
		 headers: true,ignoreEmpty: true 
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();		 
		 students.push(data);
	 })
	 .on("end", function(){
        Student.create(students, function(err, documents) {
			if (err) throw err;
            res.send(students);
            console.log("students have been successfully uploaded");
            //res.send(students.length + ' students have been successfully uploaded.');           
     });
    });
	
  })

app.listen(1802,() =>{
    console.log("Server running 1802");
})
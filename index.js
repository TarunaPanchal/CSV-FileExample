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
		
	// Student.create({"firstName":"MAHENDRA","lastName":"PANCHAL","age":25,"date":new Date()}, function(err, documents) {
	// 	if (err) throw err;
	// 				res.send(documents);
	// 				console.log("students have been successfully uploaded");
	// 				//res.send(students.length + ' students have been successfully uploaded.');           
	//  });


	csv
	 .fromString(studentFile.data,  {
		 headers: true,ignoreEmpty: true 
	 })
	 .on("data", function(data){

		console.log('DATA =============>' , data );
			let _data = parseInt(data['age']);
			data['age'] = _data;		
		 data['_id'] = new mongoose.Types.ObjectId();		 
		 students.push(data);
	 })
	 .on("end", function(){

		console.log('students=============>' , students);

        Student.create(students, function(err, documents) {
			if (err) throw err;
            res.send(students);
            console.log("students have been successfully uploaded");
            //res.send(students.length + ' students have been successfully uploaded.');           
     });
	  });

	
  })

app.listen(1803,() =>{
    console.log("Server running 1802");
})
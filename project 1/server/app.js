const express = require("express");
const path = require("path");
const dotenv = require('dotenv').config();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const hbs = require('hbs');
const PORT = 8080;
var fileUpload = require('express-fileupload');
var cors = require('cors');



app.use(cors())

const publicDirectory = './public';
app.use('image',express.static(publicDirectory+'/image/'))
app.use(express.static(publicDirectory))
app.use(fileUpload());



app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public'));     

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
});
   

// app.post('/uploadFile',(req,res)=>{
//     console.log(req)


//     var file = ''

//     var uploadedFile = req.files.file;
//     file = uploadedFile.name;
//             uploadedFile.mv(publicDirectory + '/image/' + file, (err) => {
//                 if (err) {
//                     return res.status(500).json({
//                         error: err
//                     });
//                 }
//             })    
//     res.json({'message':'fkr vua'});
// }) 


app.post('/uploadFile', (req, res) => {
    const { name,fname,mname,blood,gender,service,email,tshirt,paddress,peraddress,year,number,password } = req.body;
    var file = '';

    if (req.files != null) {
        if (req.files.file !== undefined) {
            var uploadedFile = req.files.file;
            file = uploadedFile.name;
            uploadedFile.mv(publicDirectory + '/image/' + file, (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
            })   
        }
    }

    db.query('SELECT email from user WHERE email = ?', [email], async (err, results) => {
        if(err) throw err;
  
        if(results.length > 0) {
          res.json({'alert':"Email ALready Exist",'message':false})
        } else {
          
            let hashedPassword = await bcrypt.hash(password,10);
            db.query('INSERT INTO user SET ?', {   name:name,fname:fname,mname:mname,blood:blood,gender:gender,service:service,email:email,tshirt:tshirt,paddress:paddress,peraddress:peraddress,years:year,number:number,password:hashedPassword,file:file }, (err, results) => {
                console.log(err);
                console.log(results);
              
            res.json({'message':true,'alert':'successful'})
        
            });
        }
      })
})


//     // Insert the email and file name into the database
//     db.query('INSERT INTO user SET ?', { email: email, file: file }, (err, results) => {
//         if (err) {
//             return res.status(500).json({
//                 error: err
//             });
//         }
//         res.json({ message: true });
//     });
// });


// app.post('/user_register',(req,res)=>{
//     const {email, password} = req.body;
//     console.log(req.body);
    
//     db.query('SELECT email from user WHERE email = ?', [email], async (err, results) => {
//       if(err) throw err;

//       if(results.length > 0) {
//         res.json({'alert':"Email ALready Exist",'message':false})

//       } else {
          
//             let hashedPassword = await bcrypt.hash(password,10);
//             db.query('INSERT INTO user SET ?', {  email: email, password: hashedPassword }, (err, results) => {
                
              
//             res.json({'message':true,'alert':'successful'})
        
              
             
//             });

           
         
//       }
//     });
//   }); 


app.listen(PORT);
console.log( `The server is running on ${PORT}`)
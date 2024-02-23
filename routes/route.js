//users.js in routes/users.js
const express = require('express');
require('dotenv').config();
var async = require('async'), connection;
const router = express.Router();
const helpers = require('../helpers');
const date = require('date-and-time');
var connection  = require('../lib/db');
var randtoken = require('rand-token');
var nodemailer = require("nodemailer");
const multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
const { Client } = require("appwrite"); // Ensure the correct path to the appwrite library
const { Storage } = require("appwrite"); // Ensure the correct path to the appwrite library
var path = require('path');
const fs = require('fs');

// Initialize Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d006d298586d1e239d');

const storage = new Storage(client);
//login handle
router.get('/', (req,res)=>{
                res.render('index');
            }
        )




router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/signup',(req,res)=>{
    res.render('register')
    })
router.get('/forgot_password',(req,res)=>{
     res.render('forgot_password');
})
    router.get('/terms',(req,res)=>{
        res.render('terms')
        })
router.get('/support',(req,res)=>{
    res.render('support')
    })
router.get('/services',(req,res)=>{
    res.render('services')
    })
router.get('/about',(req,res)=>{
    res.render('about');
})
router.get('/contact',(req,res)=>{
    res.render('dashboard/contact');
})
router.get('/technical-analysis',(req,res)=>{
    res.render('dashboard/technical-analysis');
})
router.get('/calculator',(req,res)=>{
    res.render('dashboard/calculator');
})
router.get('/dashboard',(req,res)=>{
    var sql = "SELECT * FROM users WHERE id="+user_id;
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
            res.redirect('/login')
        } else {
            obj = result.rows[0];
            res.render('dashboard/welcome', {obj});
            console.log(obj.first);
        }

    }); 
})
router.get('/fundamental-analysis',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql = "SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result.rows[0];
                res.render('dashboard/fundamental-analysis', {obj});
                console.log(obj.email);
            }    
        });
    }else{
        res.redirect('../login');
    }
})
router.get('/news',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql = "SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result.rows[0];
                res.render('dashboard/news', {obj});
                console.log(obj.email);
            }    
        });
    }else{
        res.redirect('../login');
    }
})

router.get('/verify',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sqo ="SELECT * FROM transactions WHERE user_id="+user_id;
        connection.query(sqo, function (err, resu){
            if (err) {
                throw err;
            } else {
                obj = resu;
                    res.render('verify');
                
            }
        });
    }else{
        res.redirect('../login');
    }
})
router.get('/security',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql = "SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result.rows[0];
                res.render('dashboard/security', {obj});
                console.log(obj.first);
            }    
        });
    }else{
        res.redirect('../login');
    }
})
router.get('/personal',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql = "SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result.rows[0];
                res.render('dashboard/personal', {obj});
                console.log(obj.first);
            }    
        });
    }else{
        res.redirect('../login');
    }
})
router.get('/contactSupport',(req,res)=>{
    res.render('contactSupport');
})
router.get('/tradehistory',(req,res, next)=>{
    if (typeof user_id !== 'undefined'){
        var sql ="SELECT * FROM transactions WHERE user_id="+user_id;
        connection.query(sql, function (err, result){
            if (err) {
                throw err;
            } else {
                coli = result.rows[0];
                res.render('dashboard/tradehistory', {coli}); 

                }
        });
    }else{
        res.redirect('../login');
    }
})

router.get('/history',(req,res, next)=>{
    if (typeof user_id !== 'undefined'){
        var sql ="SELECT * FROM transactions WHERE user_id="+user_id;
        connection.query(sql, function (err, result){
            if (err) {
                throw err;
            } else {
                coli = result.rows[0];
                res.render('dashboard/history', {coli}); 

                }
        });
    }else{
        res.redirect('../login');
    }
})

router.get('/withdrawal',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql ="SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result){
            if (err) {
                throw err;
            } else {
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    coli=row;
                    res.render('dashboard/withdrawal', {obj, coli});
                console.log(row);
                });
                
                
            }
        });
    }else{
        res.redirect('../login');
    }
    
})

router.get('/funding',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sqo ="SELECT * FROM users WHERE id="+user_id;
        connection.query(sqo, function (err, resu){
            if (err) {
                throw err;
            } else {
                obj = resu.rows[0];
                console.log(obj);
                    res.render('dashboard/funding', {obj});
                
                
                
            }
        });
    }else{
        res.redirect('../login');
    }
})

router.get('/admin',(req,res)=>{
    var sql = "SELECT * FROM users";
    connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result.rows;
                res.render('admin', {obj, mode: 'light-mode'});
                console.log(obj.first);
            }
        })
        
    });
router.post('/admin', function(req, res) {
    user ={
        whatsapp: req.body.whatsapp
    }
    connection.query('UPDATE admin SET $1 WHERE id = 1', user, function(err, result){
        res.redirect('/admin')
    })
})
router.get('/deleteuser/(:id)', function(req, res, next){
    connection.query('DELETE FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
        if (err) throw err;
        res.redirect('/admin');
    })
});
router.get('/admin/edit/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const query = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await connection.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = rows[0];
        res.render('edit', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { fname, email, balance, account, country } = req.body;

        const query = 'UPDATE users SET fname = $1, email = $2, balance = $3, account = $4, country = $5 WHERE id = $6';
        await connection.query(query, [fname, email, balance, account, country, userId]);

        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/personal',(req,res)=>{
    req.assert('first', 'First Name is required').notEmpty()           //Validate name
    req.assert('last', 'Last Name is required').notEmpty()           //Validate name
          //Validate name
    req.assert('phone', 'Phone Number is required').notEmpty() 

    var errors = req.validationErrors()
    if( !errors ) {   //No errors were found.  Passed Validation!
        var user = {
            first: req.sanitize('first').escape().trim(),
            last: req.sanitize('last').escape().trim(),

            phone: req.sanitize('phone').escape().trim(),
        }

        connection.query('UPDATE users SET $1 WHERE id='+user_id, user, function(err, result)  {
            if (err) {
                req.flash('error', err)
                
                // render to views/user/add.ejs
                res.render('profile', {
                    title: 'Edit User',
                    id: req.params.id,
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email
                })
            } else {
                req.flash('success', 'Data updated successfully!')
                
                // render to views/user/add.ejs
                res.redirect('/personal');
            }
        })
    }
})

//Register handle
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email)
    if (email == 'admin@xprexmarket.com' && password == 'ad9min@/j01') {
        res.redirect('/admin');
    } else {
        connection.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], function(err, rows) {
            if (err) {
                console.error('Error executing query:', err);
                req.flash('error', 'An error occurred while retrieving user information.');
                return res.redirect('/login');
            }
            // Check if rows is empty or null
            if (!rows || rows.length === 0) {
                console.log('No user found with the provided credentials.');
                req.flash('error', 'Please enter correct email and Password!');
                return res.redirect('/login');
            } else { // if user found
                // render to views/user/edit.ejs template file
                req.session.loggedin = true;
                req.session.uniqueSID = req.session.id;
                req.session.email = email;
                var row = rows.rows[0]; // Assuming you're only interested in the first row
                user_id = row.id; // Accessing id property
                console.log(row.id);
                res.redirect('/dashboard');
        };
    })
}
});



  //signup post handle
router.post('/signup', async (req, res) => {
  try {
    req.assert('fname', 'First Name is required').notEmpty();
    req.assert('country', 'Country is required').notEmpty();
    req.assert('phone', 'Phone Number is required').notEmpty();
    req.assert('account', 'A valid account is required').notEmpty();
    req.assert('password', 'Password is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();
    
    const errors = req.validationErrors();
    if (!errors) {
      const { fname, account, country, phone, email, password } = req.body;
      const balance = 00;
      const verification = "pending";

      const query = 'INSERT INTO users (fname, account, country, phone, email, password, balance,  verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
      const result = await connection.query(query, [fname, account, country, phone, email, password, balance, verification]);

       // Send verification email
       //const emailTemplate = fs.readFileSync('emailTemplate', 'utf8');
<<<<<<< HEAD
       const renderedTemplate = ejs.render('emailTemplate', { name: fname, verificationCode: generateVerificationCode() });
=======
      /* const renderedTemplate = ejs.render('emailTemplate', { name: fname, verificationCode: generateVerificationCode() });
>>>>>>> 1d4e9daa1a7993fbaf9123588c0dc89f35fd7dec
 
       await transporter.sendMail({
         from: 'support@chasefxonline.com',
         to: email,
         subject: 'Please verify your email address',
         html: renderedTemplate
       });*/
      
      req.flash('success', 'You have successfully signed up!');
      user_id = result.rows[0].id;
      res.redirect('/login');
    } else {
      const error_msg = errors.map(error => error.msg).join('<br>');
      req.flash('error', error_msg);
      
      res.render('signup', { 
        title: 'Registration Page',
        first: req.body.first,
        last: req.body.last,
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        password: ''
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to generate a verification code (you can customize this as per your requirement)
function generateVerificationCode() {
    // Generate a random 6-digit code
    return Math.floor(100000 + Math.random() * 900000);
}
//logout
router.get('/logout',(req,res)=>{
    res.redirect('/')
 })
 router.post('/logout',(req,res)=>{
    res.redirect('/')
 })
 router.post('/withdrawal',(req,res)=>{
      //No errors were found.  Passed Validation!
      var amoun= req.body.amount;
      var amount= Math.floor(amoun);
      var prev= coli.balance;
      console.log(prev);
      var charge= coli.charge_per;
      var charg= coli.charge_fix;
      console.log(charge);
      var perc = charge/100;
      console.log(perc);
      var perco= amount*perc;
      var deduct = perco + charg;
      console.log(deduct)
      var deduc= deduct + amount;
      console.log(deduc)
      var balance = prev- deduc;
      const now  =  new Date();
      const value = date.format(now,'YYYY/MM/DD');
      console.log(balance);
      if (balance <= 0) throw err;
      var note = {
      method: req.sanitize('payment_mode').escape().trim(),
      deposit: req.sanitize('amount').escape().trim(),
      method_id: req.sanitize('method_id').escape().trim(),
      status: "Withdrawal Pending",
      user_id: user_id,
      date: value
      }
        connection.query('INSERT INTO transactions SET $1', note, function(err, result)  {
            res.redirect('/transactions');
        })
        connection.query('UPDATE users SET balance='+balance + ' WHERE id ='+user_id, balance, function(err, result) {
            if (err) throw err;});
    } 
 )

 const transporter = nodemailer.createTransport({
    host: "smtp.chasefxonline.com",  
    secureConnection: false, 
    port: 587,
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: 'support@chasefxonline.com',
        pass: 'PbEiL#U7'
    }
  });
 
 /*------------------Routing Started ------------------------*/
 
 
 router.get('/send',function(req,res){
    var sql ="SELECT * FROM users WHERE id="+user_id;
    connection.query(sql, function (err, result){
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                email=row.email;
                id=row.id;
                rand=Math.floor((Math.random() * 100) + 54);
                host=req.get('host');
                link="http://"+req.get('host')+"/verify?id="+rand;
                mailOptions={
                    from: "Xprex-Market <support@xprexmarket.com>",
                   to : email,
                   subject : "Please confirm your Email account",
                   html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                   res.end("error");
                 }else{
                        console.log("Message sent: " + response.message);
                   res.render("sent");
                     }
              });
              });
            
            
        }
    });
       
 });

 
 router.get('/verify',function(req,res){
 console.log(req.protocol+":/"+req.get('host'));
 if((req.protocol+"://"+req.get('host'))==("http://"+host))
 {
   console.log("Domain is matched. Information is from Authentic email");
   if(req.query.id==rand)
   {
      user_id= req.query.id;
      console.log("email is verified");
      connection.query('UPDATE users SET verification="verified" WHERE id='+user_id)
      res.redirect('dashboard');
   }
   else
   {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
   }
 }
 else
 {
   res.end("<h1>Request is from unknown source");
 }
 });

 router.get('/verifier',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==dep_id && req.query.user==user_id)
      {
          var sql="UPDATE transactions SET $1 WHERE user_id="+user_id+" AND id="+dep_id;
           var nat ={
               status: "Deposit Verified"
           }
           connection.query(sql, nat,)
          res.render('verified');
      }
      else
      {
         console.log("email is not verified");
         res.end("<h1>Bad Request</h1>");
      }
    }
    else
    {
      res.end("<h1>Request is from unknown source");
    }
    });
 router.post('/join', (req,res) =>{
     res.redirect('/deposit')
 })

 aws.config.update({
    secretAccessKey: "5W82EKzBoeGKruUa1ypG6VbVWfa0k70yXSbClF2A",
    accessKeyId: "lnRaYWvGaeQaHjKa",
    region: 'eu-central-1'
});

var upload = multer();
// Define a function to generate unique IDs
const ID = {
    unique: function() {
        // Generate a unique ID (you can use any method/library to generate IDs)
        return Math.random().toString(36).substr(2, 9); // Example: Generate a random alphanumeric ID
    }
};
 router.post('/funding', upload.single('file'), async (req,res)=>{
    const { file} = req;
    //var image= req.files.file;
    //console.log(image);

    try {
        // Create file in Appwrite storage
        const promise = storage.createFile(
            '65d0086abf84cf73a629',
            ID.unique(), // Ensure you define ID.unique() function to generate unique IDs
            file.buffer // Access uploaded file from form data
        );

        // Wait for file creation response
        const response = await promise;
        console.log(response); // Success

        res.send('File uploaded successfully!');
    } catch (error) {
        console.error(error); // Log error
        res.status(500).send('Failed to upload file.');
    }
    mailOptions={
        from: "Xprex-Market <xprexmarket@outlook.com>",
       to : 'dantheredwolf@outlook.com',
       subject : "Please confirm Payment",
       html : "Hello,<br> Please Click on the link to verify payment.<br><img src= ''><a href=''>Click here to verify</a>"	
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
       res.end("error");
        }else{
            console.log("Message sent: ");
       res.render("funding");
         }
  });
            
            
    });
module.exports  = router;



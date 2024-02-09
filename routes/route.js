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
var aws = require('aws-sdk')
var path = require('path');
var s3 = new aws.S3();
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
    var sqo = "SELECT * FROM admin";
    connection.query(sql, function (err, result) {
        connection.query(sqo, function (err, resul) {
            if (err) {
                throw err;
            } else {
                obj = result.rows[0];
                obo = resul;
                res.render('admin', {obj, obo});
                console.log(obj.first);
            }
        })
        
    });
})
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
})
router.get('/edituser/(:id)', function(req, res, next){
    connection.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
        if(err) throw err
        
        // if user not found
        if (rows.length <= 0) {
            
            req.flash('error', 'User not found with id = ' + req.params.id)
            res.redirect('/admin')
        }
        else { // if user found
            // render to views/user/edit.ejs template file
            res.render('edituser', {
                title: 'Edit User', 
                //data: rows[0],
                id: rows[0].id,
                first: rows[0].first,
                last: rows[0].last,
                phone: rows[0].phone,
                deposit: rows[0].deposit,
                email: rows[0].email,
                balance: rows[0].balance,
                charge_per: rows[0].charge_per,
                charge_fix: rows[0].charge_fix,
            })
        }			
    })

})

        // EDIT USER POST ACTION
router.post('/edituser/(:id)', function(req, res, next) {
    req.assert('first', 'First Name is required').notEmpty()           //Validate name
    req.assert('last', 'Last Name is required').notEmpty()           //Validate name
    req.assert('phone', 'Phone Number is required').notEmpty() 
    req.assert('balance', 'Balance is required').notEmpty()   //Validate password
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    req.assert('deposit', 'Deposit is required').notEmpty()  
    req.assert('charge_per', 'Charge Percentage is required').notEmpty()  
    req.assert('charge_fix', 'Fixed Charge is required').notEmpty()  
    req.assert('bonus', 'Bonus is required').notEmpty() 
    req.assert('profit', 'Profit is required').notEmpty() 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a <span>comment</span>'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var user = {
			first: req.sanitize('first').escape().trim(),
            last: req.sanitize('last').escape().trim(),
            phone: req.sanitize('phone').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            balance: req.sanitize('balance').escape().trim(),
            profit: req.sanitize('profit').escape().trim(),
            deposit: req.sanitize('deposit').escape().trim(),
            bonus: req.sanitize('bonus').escape().trim(),
            charge_per:req.sanitize('charge_per').escape().trim(),
            charge_fix: req.sanitize('charge_fix').escape().trim(),
		}
        connection.query('UPDATE users SET $1 WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                
                // render to views/user/add.ejs
                res.render('editauser', {
                    title: 'Edit User',
                    id: req.params.id,
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email
                })
            } else {
                req.flash('success', 'Data updated successfully!')
                
                // render to views/user/add.ejs
                res.redirect('/admin');
            }
        })
		
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('editbuser', { 
            title: 'Edit User',            
			id: req.params.id, 
			name: req.body.name,
			age: req.body.age,
			email: req.body.email
        })
    }
})
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
      const balance = 10;
      const bonus = 10;
      const charge_per = 10;
      const charge_fix = 2;
      const verification = "pending";

      const query = 'INSERT INTO users (fname, account, country, phone, email, password, balance, bonus, charge_per, charge_fix, verification) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
      const result = await connection.query(query, [fname, account, country, phone, email, password, balance, bonus, charge_per, charge_fix, verification]);
      
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
    host: "smtp.xprexmarket.com",  
    secureConnection: false, 
    port: 587,
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: 'support@xprexmarket.com',
        pass: 'G%RarPY5'
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
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'iyayi',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
        acl:'public-read'
    })
    
});
 router.post('/deposit', upload.single('proof'), (req,res)=>{
    var image= req.file.originalname;
    console.log(image);
    const now  =  new Date();
    const value = date.format(now,'YYYY/MM/DD');
    var deposit= req.body.amount;
      var note ={
        deposit: req.sanitize('amount').escape().trim(),
        user_id: user_id
      }
      connection.query('INSERT INTO transactions SET $1', note, function(err, result)  {
        dep_id=result.insertId;
        console.log(dep_id);
    })
    var noter = {
        method: req.sanitize('method').escape().trim(),
        status: "Pending Verification",
        dater: value
        }
        connection.query('UPDATE transactions SET $1 WHERE id='+dep_id+'AND user_id='+user_id, noter, function(err, result)  {
        var sql ="SELECT * FROM transactions WHERE user_id="+user_id+" AND id="+dep_id;
        connection.query(sql, function (err, result){
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                dep_id=row.id;
                user_id=row.user_id;
                host=req.get('host');
                link="http://"+req.get('host')+"/verifier?id="+dep_id+"&user="+user_id;
                linka="https://biniboybucket.s3.eu-north-1.amazonaws.com"+"/"+image;
                mailOptions={
                    from: "Xprex-Market <xprexmarket@outlook.com>",
                   to : 'dantheredwolf@outlook.com',
                   subject : "Please confirm Payment",
                   html : "Hello,<br> Please Click on the link to verify payment.<br><img src= "+linka+"><a href="+link+">Click here to verify</a>"	
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                   res.end("error");
                    }else{
                        console.log("Message sent: ");
                   res.render("sent");
                     }
              });
              });
            
            
        }
    });
            res.redirect('/transactions');
 })
 });
module.exports  = router;



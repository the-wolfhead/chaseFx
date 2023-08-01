//users.js in routes/users.js
const express = require('express');
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
//signin handle
router.get('/', (req,res)=>{
    res.render('index');
})
router.get('/signin',(req,res)=>{
    res.render('signin');
})
router.get('/signup',(req,res)=>{
    res.render('signup')
    })
    router.get('/terms',(req,res)=>{
        res.render('terms')
        })
router.get('/aml_policy',(req,res)=>{
    res.render('aml_policy')
    })
router.get('/privacy_policy',(req,res)=>{
    res.render('privacy_policy')
    })
router.get('/about',(req,res)=>{
    res.render('about');
})
router.get('/contact',(req,res)=>{
    res.render('contact');
})
router.get('/faq',(req,res)=>{
    res.render('faq');
})
router.get('/notif',(req,res)=>{
    res.render('notif');
})
router.get('/dashboard',(req,res)=>{
    var sql = "SELECT * FROM users WHERE id="+user_id;
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            obj = result;
            res.render('dashboard', {obj});
            console.log(obj.first);
        }

    }); 
})
router.get('/navbarPage',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql = "SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result;
                res.render('navbarPage', {obj});
                console.log(obj.email);
            }    
        });
    }else{
        res.redirect('../signin');
    }
})
router.get('/payment',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql ="SELECT * FROM deposit WHERE deposit_id="+dep_id;
        connection.query(sql, function (err, result){
            if (err) {
                throw err;
            } else {
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    coli=row;
                    res.render('payment', {obj, coli});
                console.log(row);
                });
            }
        });
    }else{
        res.redirect('../signin');
    }   
})

router.get('/verify',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sqo ="SELECT * FROM deposit WHERE user_id="+user_id;
        connection.query(sqo, function (err, resu){
            if (err) {
                throw err;
            } else {
                obj = resu;
                    res.render('verify');
                
            }
        });
    }else{
        res.redirect('../signin');
    }
})
router.get('/profile',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sql = "SELECT * FROM users WHERE id="+user_id;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            } else {
                obj = result;
                res.render('profile', {obj});
                console.log(obj.first);
            }    
        });
    }else{
        res.redirect('../signin');
    }
})
router.get('/contactSupport',(req,res)=>{
    res.render('contactSupport');
})
router.get('/transactions',(req,res, next)=>{
    if (typeof user_id !== 'undefined'){
        var sql ="SELECT * FROM notif WHERE user_id="+user_id;
        connection.query(sql, function (err, result){
            if (err) {
                throw err;
            } else {
                coli = result;
                    var sqo ="SELECT * FROM deposit WHERE user_id="+user_id;
                    connection.query(sqo, function (err, resu){
                        if (err) {
                            throw err;
                        } else {
                            obj = resu;
                                res.render('transactions', {obj, coli}); 
                        }
                    });
                }
        });
    }else{
        res.redirect('../signin');
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
                    res.render('withdrawal', {obj, coli});
                console.log(row);
                });
                
                
            }
        });
    }else{
        res.redirect('../signin');
    }
    
})

router.get('/deposit',(req,res)=>{
    if (typeof user_id !== 'undefined'){
        var sqo ="SELECT * FROM deposit WHERE user_id="+user_id;
        connection.query(sqo, function (err, resu){
            if (err) {
                throw err;
            } else {
                obj = resu;
                    res.render('deposit', {obj});
                
                
                
            }
        });
    }else{
        res.redirect('../signin');
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
            obj = result;
            obo = resul;
            res.render('admin', {obj, obo});
            console.log(obj.first);
        }

        
    });
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
        connection.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
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
router.post('/profile',(req,res)=>{
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

        connection.query('UPDATE users SET ? WHERE id='+user_id, user, function(err, result)  {
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
                res.redirect('/profile');
            }
        })
    }
})

//Register handle
router.post('/signin',(req,res)=>{
    var email = req.body.email;
var password = req.body.password;
if ((email == 'admin@xprexmarket.com')&&(password =='admin01')){
    res.redirect('/admin');
}
else{
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
        req.flash('error', 'Please enter correct email and Password!')
        console.log('error one')
        res.redirect('/signin')
        }
        else { // if user found

        // render to views/user/edit.ejs template file
        req.session.loggedin = true;
        req.session.uniqueSID = req.session.id;
        req.session.email = email;
        Object.keys(rows).forEach(function(key) {
            var row = rows[key];
            user_id=row.id;
            console.log(row.id)
          });
            res.redirect('/dashboard')
        
        }            
        })
}
  })
  //signup post handle
router.post('/signup',(req,res)=>{
    req.assert('first', 'First Name is required').notEmpty()           //Validate name
    req.assert('last', 'Last Name is required').notEmpty()           //Validate name
    req.assert('country', 'Country is required').notEmpty()           //Validate name
    req.assert('phone', 'Phone Number is required').notEmpty() 
    req.assert('home_address', 'A valid home address is required').isEmail()
    req.assert('city', 'A valid city is required').isEmail()
    req.assert('postal_code', 'A valid postal_code is required').isEmail()
    req.assert('password', 'Password is required').notEmpty()   //Validate password
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    var errors = req.validationErrors()
    if( !errors ) {   //No errors were found.  Passed Validation!
        var user = {
            first: req.sanitize('first').escape().trim(),
            last: req.sanitize('last').escape().trim(),
            country: req.sanitize('country').escape().trim(),
            phone: req.sanitize('phone').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim(),
            balance: 10,
            bonus: 10,
            charge_per: 10,
            charge_fix: 2,
            verification: "pending"
        }
        var email = req.body.email;
        connection.query('INSERT INTO users SET ?', user, function(err, result)  {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // render to views/user/add.ejs
                res.render('auth/signup', {
                title: 'Registration Page',
                first: '',
                last: '',
                country: '',
                phone: 00,
                password: '',
                email: ''                   
                })
            } else {                
                req.flash('success', 'You have successfully signed up!');
                user_id=result.insertId;
                res.redirect('/send' );
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
    res.render('/signup', { 
    title: 'Registration Page',
    first: req.body.first,
    last: req.body.last,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    password: ''
    })
    }
})
//logout
router.get('/logout',(req,res)=>{
    res.redirect('/welcome')
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
      payment_mode: req.sanitize('payment_mode').escape().trim(),
      amount: req.sanitize('amount').escape().trim(),
      method_id: req.sanitize('method_id').escape().trim(),
      payment_status: "Withdrawal Pending",
      user_id: user_id,
      date: value
      }
        connection.query('INSERT INTO notif SET ?', note, function(err, result)  {
            res.redirect('/transactions');
        })
        connection.query('UPDATE users SET balance='+balance + ' WHERE id ='+user_id, balance, function(err, result) {
            if (err) throw err;});
    } 
 )
 router.post('/deposit', (req, res)=> {
      var deposit= req.body.amount;
      var note ={
        deposit: req.sanitize('amount').escape().trim(),
        user_id: user_id
      }
      connection.query('INSERT INTO deposit SET ?', note, function(err, result)  {
        dep_id=result.insertId;
        console.log(dep_id);
        res.redirect('/payment');
    })

 } )
 const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",  
    secureConnection: false, 
    port: 587,
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: 'xprexmarket@outlook.com',
        pass: 'QwertyAsdf01'
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
                    from: "Xprex-Market <xprexmarket@outlook.com>",
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
          var sql="UPDATE deposit SET ? WHERE user_id="+user_id+" AND deposit_id="+dep_id;
           var nat ={
               deposit_stat: "Deposit Verified"
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
 router.post('/payment', upload.single('proof'), (req,res)=>{
    var image= req.file.originalname;
    console.log(image);
    const now  =  new Date();
    const value = date.format(now,'YYYY/MM/DD');
    
    var note = {
        deposit_method: req.sanitize('deposit_method').escape().trim(),
        deposit_stat: "Pending Verification",
        dater: value
        }
        connection.query('UPDATE deposit SET ? WHERE deposit_id='+dep_id+'AND user_id='+user_id, note, function(err, result)  {
        var sql ="SELECT * FROM deposit WHERE user_id="+user_id+" AND deposit_id="+dep_id;
        connection.query(sql, function (err, result){
        if (err) {
            throw err;
        } else {
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                dep_id=row.deposit_id;
                user_id=row.user_id;
                host=req.get('host');
                link="http://"+req.get('host')+"/verifier?id="+dep_id+"&user="+user_id;
                linka="https://biniboybucket.s3.amazonaws.com"+"/"+image;
                mailOptions={
                    from: "Xprex-Market <xprexmarket@outlook.com>",
                   to : 'Erhahonvictory@gmail.com',
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



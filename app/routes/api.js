//Schemas
let InfoSection = require('../models/infoSection');
let Admin       = require('../models/admin');
let ImageS      = require('../models/imagesSection');
let Article     = require('../models/article');
let Video       = require('../models/videoSection');
let User        = require('../models/user');

//Needed
let nodemailer  = require('nodemailer');
let multer      = require('multer');
let fs          = require("fs");
let jwt         = require('jsonwebtoken');

let secret = 'hidonshabat';

module.exports = function (router) {
    
    // Info Section A-E-G
    router.post('/infoSection', function(req, res){
        let infoSection = new InfoSection();
        infoSection.title = req.body.title;
        infoSection.body_content = req.body.body_content;
        infoSection.email = req.body.email; 
        infoSection.phone = req.body.phone;

        let CRITERIA = req.body.title == '' || req.body.title == null || req.body.body_content == '' || req.body.body_content == null || req.body.email == '' || req.body.email == null || req.body.phone == '' || req.body.phone == null;

        if(CRITERIA){
            res.json({ success: false, message: 'Error | check your vars again' }); 
        } else {
            infoSection.save(function(err){
                if(err) res.json({ success: false, message: 'Error | check again' });
                else res.json({ success: true, message: 'Create new Body' });
            })
        }
    });

    router.get('/infoSection', function(req, res){
        InfoSection.find({}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            if(result) res.json({ success: true, message: 'Some info are ready... ',  info: result });
        })
    });

    router.post('/updateInfoSection', function(req, res){
        let updateInfoSection = {
            title: req.body.title,
            body_content: req.body.body_content,
            email: req.body.email,
            phone: req.body.phone     
        } 

        InfoSection.findOneAndUpdate({_id: req.body.id}, updateInfoSection, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Updated' });
        })
    });

    //Images Section
    let upload = multer({ dest: 'public\/uploads\/photo'});

    router.post('/imageSection', upload.single('file'), function(req, res) {
        let timeInMs = Date.now();
        let file = req.file.destination + '/' + timeInMs +req.file.originalname ;
        let imageS = new ImageS();
        imageS.title = req.body.title;
        imageS.description = req.body.description;
        imageS.imageUrl = req.file.destination + '/' + timeInMs +req.file.originalname ;

        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err);
                res.send(500);
            } else {
                imageS.save();
                res.redirect('/admin');
                console.log(imageS);
            }   

        });
    });

    router.get('/imageSection', function(req, res){
        ImageS.find({}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })

    router.post('/getImgByTitle', function(req, res){
        ImageS.findOne({title: req.body.title}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })
    
    router.post('/updateImgSection', function(req, res){
        let updateimgSection = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imgUrl
        }
        console.log(updateimgSection);
        console.log(req.body._id);

        ImageS.findOneAndUpdate({_id: req.body._id}, updateimgSection, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Updated' });
        })
    })

    router.post('/deleteImgSection', function(req, res){
        ImageS.findOneAndRemove({_id: req.body._id}, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Deleted' });
        })
    });

    //Articles
    let uploadFile = multer({ dest: 'public\/uploads\/file'});
    
    router.post('/article', uploadFile.single('file'), function(req, res) {
        let timeInMs = Date.now();
        let file = req.file.destination + '/' + timeInMs +req.file.originalname ;
        let article = new Article();
        article.title = req.body.title;
        article.description = req.body.description;
        article.fileUrl = req.file.destination + '/' + timeInMs +req.file.originalname ;

        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err);
                res.send(500);
            } else {
                article.save();
                res.redirect('/admin');
            }   

        });
    });

    router.get('/article', function(req, res){
        Article.find({}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })

    router.post('/getArticleByTitle', function(req, res){
        Article.findOne({title: req.body.title}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })

    router.post('/updateArticle', function(req, res){
        let updateArticle = {
            title: req.body.title,
            description: req.body.description,
            fileUrl: req.body.fileUrl
        }

        Article.findOneAndUpdate({_id: req.body.id}, updateArticle, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Updated' });
        })
    })

    router.post('/deleteArticle', function(req, res){
        Article.findOneAndRemove({_id: req.body._id}, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Deleted' });
        })
    });

    // Video section
    router.post('/video', function(req, res){
        let video = new Video();
        video.title = req.body.title;
        video.description = req.body.description;
        video.videoUrl = req.body.videoUrl;

        let CRITERIA = req.body.title == '' || req.body.title == null || req.body.description == '' || req.body.description == null || req.body.videoUrl == '' || req.body.videoUrl == null;

        if(CRITERIA){
            res.json({ success: false, message: 'Error | check your vars again' }); 
        } else {
            video.save(function(err){
                if(err) res.json({ success: false, message: 'Error | check again' });
                else res.json({ success: true, message: 'Create new Video section' });
            })
        }
    })

    router.get('/video', function(req, res){
        Video.find({}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })

    router.post('/getVideoByTitle', function(req, res){
        Video.findOneAndRemove({title: req.body.title}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })

    router.post('/updateVideo', function(req, res){
        let updateArticleVideo = {
            title: req.body.title,
            description: req.body.description,
            videoUrl: req.body.videoUrl
        }

        Video.findOneAndUpdate({_id: req.body._id}, updateArticleVideo, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Updated' });
        })
    })

    router.post('/deleteVideo', function(req, res){
        Video.findOneAndRemove({_id: req.body._id}, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Deleted' });
        })
    });

    // User
    router.post('/user', function(req, res){
        let user = new User();
        user.full_name = req.body.full_name;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.email = req.body.email;

        console.log(user);

        let CRITERIA = req.body.full_name == '' || req.body.full_name == null || req.body.email == '' || req.body.email == null;

        if(CRITERIA){
            res.json({ success: false, message: 'Error | check your vars again' }); 
        } else {
            user.save(function(err){
                if(err) {
                    res.json({ success: false, message: 'Error | check again' +err });
                } else {
                    res.json({ success: true, message: 'New admin added' });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'yaghobieh@gmail.com',
                          pass: 'john132456'
                        }
                      });
                      
                      var mailOptions = {
                        from: 'Hidonshabat',
                        to: 'yaghobieh@gmail.com',
                        subject: 'משתמש חדש נרשם לחידון',
                        text: 'name: ' + user.full_name+ ' Email: ' +user.email
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                } 
                
            })
        }
    });

    router.get('/user', function(req, res){
        User.find({}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: false, message: 'Got some info', info: result });
        })
    })

    router.post('/changeUserStatus', function(req, res){
        changeStatusUser = {
            full_name: req.body.full_name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            checked: true
        }

        User.findOneAndUpdate({_id: req.body._id}, changeStatusUser, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            if(result) res.json({ success: true, message: 'Some info are ready... ',  info: result });
        })
    });

    //Admin A-E-D-E
    router.post('/admin', function(req, res){
        let admin = new Admin();
        admin.username = req.body.username;
        admin.full_name = req.body.full_name;
        admin.email = req.body.email;
        admin.phone = req.body.phone;
        admin.password = req.body.password;

        console.log(admin)

        let CRITERIA = req.body.username == '' || req.body.username == null || req.body.full_name == '' || req.body.full_name == null || req.body.email == '' || req.body.email == null || req.body.phone == '' || req.body.phone == null || req.body.password == '' || req.body.password == null;

        if(CRITERIA){
            res.json({ success: false, message: 'Error | check your vars again' }); 
        } else {
            admin.save(function(err){
                if(err) res.json({ success: false, message: 'Error | check again'});
                else res.json({ success: true, message: 'New admin added' });
            })
        }
    });

    router.get('/infoSection', function(req, res){
        Admin.find({}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            if(result) res.json({ success: true, message: 'Some info are ready... ',  info: result });
        })
    });

    router.post('/updateAdmin', function(req, res){
        let updateAdmin = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone     
        } 

        Admin.findOneAndUpdate({_id: req.body._id}, updateAdmin, function(err){
            if(err) res.json({ success: false, message: 'Error | check again' });
            else res.json({ success: true, message: 'Updated' });
        })
    });

    router.post('/authenticate', function(req, res){
        Admin.findOne({email: req.body.email}, function(err, result){
            if(err) res.json({ success: false, message: 'Error | check again' });
            if(!result) {
                res.json({ success: false, message: 'Error | This user in not find...' }); 
            } else {
                //Check Password
                if(req.body.password){
                    var validPassword = result.comparePass(req.body.password);
                } else {
                    res.json({ success: false, message: 'Error | check your password again' }); 
                }
            }

            if(!validPassword){
                res.json({ success: false, message: 'Error | check your password' });
            } else {
                var token = jwt.sign({ info: result }, secret, { expiresIn: '24h' }); 
                res.json({ success: true, message: 'user authenticated!', token: token });
            }
        })
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token']; 
        if (token) {

            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded; 
                    next(); 
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' }); 
        }
    });

    router.post('/me', function(req, res) {
        res.send(req.decoded); 
     });
    
    return router;
}
angular.module('adminApp', ['adminServ', 'infoSectionServiceServ', 'imageServ', 'userServ', 'fileServ', 'videoServ'])
    .controller('adminController', function($timeout, $location, $rootScope, $scope, $window, Auth, InfoSection, Img, User, Article, Vde){
        var app = this;
        app.spinner = false; //Spinner in success new user

        //Login Admin
        $rootScope.$on('$routeChangeStart', function(){
            if( Auth.isloggedIn() ){
                console.log('Success: The user is logged in!');
                Auth.getUser().then(function(data){
                    app.isLoggedIn = true;
                    app.adminProfile = data.data.info;
                    app.loadMe = true;
                });
            }else{
                app.isLoggedIn = false;
                app.username = '';
                app.loadMe = true;
            }

        })

        this.login = function(loginData){
            
            app.loading = true;
            Auth.login(app.loginData).then(function(loginData){
                
                if(loginData.data.success){
                    app.loading = false;
                    app.msgAlert = loginData.data.message;
                    app.alertClass = "alert alert-success";
                    $location.path('/success');
                    $timeout(function() {
                        $location.path('/admin');
                        app.loginData = '';
                        app.success = false;
                    }, 2000);
                }else{
                    app.loading = false;
                    app.msgAlert = loginData.data.message;
                    app.alertClass = "alert alert-danger";
                }
            });
        }  

        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function(){ 
                $location.path('/');
            }, 2000);
        }

        //Info section
        this.createInfoSection = function(infoSectionPack) {
            InfoSection.createInfoSection(app.infoSectionPack);
        }
        
        this.infoSection = InfoSection.getInfoSection().then(function(data){
            app.infoSection = data.data.info[0];
            app.infoSectionEditPack = data.data.info[0];
        })

        this.updateInfoSection = function(infoSectionEditPack) {
            InfoSection.updateInfoSection(app.infoSectionEditPack);
        }

        // Img section
        this.getImgChange = function() {
            app.imgSectionChanged = { title: app.changedImg };
            Img.getImgByTitle(app.imgSectionChanged).then(function(data){
                app.editImgSection = data.data.info;
                app.showImgBack = true;
            })
        }

        this.imgSection = Img.getImgSectionAll().then(function(data){
            app.imgSection = data.data.info;
        })

        this.deleteImgFactory = function(deleteImgSection, index) {
            app.deleteImgSection = app.imgSection[index];
            Img.deleteImgFactory(app.deleteImgSection); 
        }

        this.updateImgSection = function(editImgSection) {
            Img.updateImgSection(app.editImgSection);
        }

        //User
        this.newUser = function(userPack) {
            User.newUser(app.userPack).then(function(data){
                if(data.data.success) {
                    app.newUserCreated = 'נוצר בהצלחה';
                    app.spinner = true;
                    console.log(data);
                } else {
                    app.spinner = false;
                    console.log(data);
                }
            })
        }

        this.users = User.getAllUsers().then(function(data){
            app.users = data.data.info;
        })

        this.changeUserStatus = function(users, index) {
            User.changeUserStatus(app.users[index]);
        }

        //Article (Files)
        this.articles = Article.getFiles().then(function(data){
            app.articles = data.data.info;
        })

        this.getArticleChange = function() {
            app.articleChanged = { title: app.articleChanged };
            Article.getArticleByTitle(app.articleChanged).then(function(data){
                app.editArticle = data.data.info;
                app.showImgBackArticle = true;
            })
        }

        this.deleteFile = function(deleteArticle, index) {
            app.deleteArticle = app.articles[index];
            console.log(app.articles[index]);
            Article.deleteFile(app.deleteArticle); 
        }

        this.updateFiles = function(editArticle) {
            Article.updateFiles(app.editArticle)
        }

        //Video
        this.videos = Vde.getVideos().then(function(data){
            app.videos = data.data.info;
        })

        this.getVideoChange = function() {
            app.videoChanged = { title: app.changedVideo };
            Vde.getVideoByTitle(app.videoChanged).then(function(data){
                app.editVideo = data.data.info;
                app.showVideo = true;
            })
        }

        this.newVideo = function(videoPack) {
            Vde.newVideo(app.videoPack);
        }

        this.deleteVideo = function(deleteVideo, index) {
            app.deleteVideo = app.videos[index];
            Vde.deleteVideo(app.deleteVideo); 
        }

        this.updateVideo = function(editVideo) {
            Vde.updateVideo(app.editVideo)
        }

    })

    .filter('capitalizeWord', function() {
        return function(text) {
          return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
        }
    })

    .filter('capitalizeWord', function() {
        return function(text) {
          return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
        }
    })

    .filter('limitStr', function(){
        return function(text){
            if(text != null ){
                return text.substring(6, 300);
            }
        }
    })

    .filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);
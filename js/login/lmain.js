var app = angular.module('logApp', []);
app.controller('logCont', function($scope) {
    $scope.User = function(usr, pwd, time, salt) {
        this.user = usr;
        this.pwd = pwd;
        this.loginNums = 0;
        this.lastLogin = time;
        this.salt = salt;
    }
    $scope.logins = [];
    $scope.register = function() {
        console.log($scope.regpwd, $scope.regpwdTwo)
        if (!$scope.regpwd || !$scope.regpwdTwo || $scope.regpwd != $scope.regpwdTwo) {
            alert('You need to enter the same password twice!');
            return false;
        } else if (!$scope.regname) {
            alert('Enter a username! I don\'t even know what to call you!')
            return false;
        }
        alert('Thanks, ' + $scope.regname + '!');
        var encPwd = $scope.genPwd($scope.regpwd);
        $scope.logins.push(new $scope.User($scope.regname, encPwd.pwd, new Date(), encPwd.salt));
        console.log($scope.logins)
    }
    $scope.login = function() {
            var bad = true;
            var found = -1;
            for (var i = 0; i < $scope.logins.length; i++) {
                //loop thru every user in the $scope.logins array. if we find 
                if (($scope.logins[i].user == $scope.logname)) {
                    if ($scope.checkPwd($scope.logins[i], $scope.logpwd)) {
                        //found em!
                        bad = false;
                        found = i;
                    }
                }
            }
            if (bad) {
                alert('Username/password not found! Please try again.');
                return false;
            }
            $scope.logins[found].loginNums++;
            var oldLogin = $scope.logins[found].lastLogin;
            $scope.logins[found].lastLogin = new Date();
            var elapsed = parseInt(($scope.logins[found].lastLogin.getTime() - oldLogin.getTime()) / 1000);
            console.log(oldLogin.getTime())
            alert('Hi, ' + $scope.logins[found].user + '. Welcome back! You\'ve logged in ' + $scope.logins[found].loginNums + ' times, and the last time you logged in was ' + oldLogin + '. This was ' + elapsed + ' seconds ago!');
        }
        // The following is a (very small!) intro to Auth stuff
    $scope.genPwd = function() {
        //important note: Unless you're a security/encryption expert, writing your own encryption is generally a VERY BAD IDEA. This is absolutely something you wanna let the professionals handle. However, for the sake of this demo, I'll write mine.
        var raw = $scope.regpwd,
            //the 'salt' is a special type of encryption. It's saved on the back-end and basically serves as the decryption key for the actual password (which itself is stored in encrypted form)
            salt = Math.ceil(Math.random() * parseInt(new Array(raw.length).fill(9, 0, raw.length).join('')));
        if (!raw || raw == '') {
            //if user didn't enter a password, throw an error and quit.
            throw new Error('No password!');
            return false;
        }
        var rawArr = raw.split('');
        for (var i = 0; i < rawArr.length; i++) {
            var num = rawArr[i].charCodeAt(0);
            num += parseInt(salt.toString()[i]); //add the random num from salt to 'shift' the char. 
            rawArr[i] = String.fromCharCode(num);
        }
        var encodedPwd = {
            pwd: rawArr.join(''),
            salt: salt.toString()
        }
        //So basically, for each character in the original password, we've shifted its char code by a random number. We then convert that char code BACK to a string, and store that (along with the salt so we can convert back!)
        return encodedPwd;
    }
    $scope.checkPwd = function(usr, candidate) {
        var decodedPwd = '';
        for (var i = 0; i < usr.pwd.length; i++) {
            var theLetter = usr.pwd[i].charCodeAt(0);
            decodedPwd += String.fromCharCode(theLetter - parseInt(usr.salt[i]));
        }
        return true;
    }
});

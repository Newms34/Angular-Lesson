var app = angular.module('logApp', []);
app.controller('logCont', function($scope) {
    $scope.User = function(usr, pwd, time) {
        this.user = usr;
        this.pwd = pwd;
        this.loginNums = 0;
        this.lastLogin = time;
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
        $scope.logins.push(new $scope.User($scope.regname, $scope.regpwd, new Date()));
        console.log($scope.logins)
    }
    $scope.login = function() {
        var bad = true;
        var found = -1;
        for (var i = 0; i < $scope.logins.length; i++) {
            //loop thru every user in the $scope.logins array. if we find 
            if (($scope.logins[i].user == $scope.logname) && ($scope.logins[i].pwd == $scope.logpwd)) {
                //found em!
                bad = false;
                found = i;
            }
        }
        if (bad) {
            alert('Username/password not found! Please try again.');
            return false;
        }
        $scope.logins[found].loginNums++;
        var oldLogin = $scope.logins[found].lastLogin;            
        $scope.logins[found].lastLogin = new Date();
        var elapsed =  parseInt(($scope.logins[found].lastLogin.getTime() - oldLogin.getTime())/1000);
        console.log(oldLogin.getTime())
        alert('Hi, ' + $scope.logins[found].user + '. Welcome back! You\'ve logged in ' + $scope.logins[found].loginNums + ' times, and the last time you logged in was ' + oldLogin + '. This was '+elapsed+' seconds ago!');
    }
});

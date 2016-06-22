var app = angular.module('anatoMod', []);
app.controller('anatoCont', function($scope, exampleFact, exampleService) {
    $scope.test = 'Here is some text!';
    $scope.codeItems = ['html', 'app', 'controller', '$scope', 'service', 'factory', 'directive', 'ng-repeat', 'ng-if / ng-show / ng-hide'];
    //AND THIS TOO!
    $scope.currItem = '';
    $scope.changeCode = function(code) {
        $scope.currItem = exampleFact.getCodeBit(code);

    };
    $scope.greet = function() {
        var name = prompt('Who are you?');
        alert(exampleService.sayHi(name));
    }
    $scope.lottery = function() {
        alert(exampleFact.lotto())
    }
})

app.filter('titleCase', function() {
    //filters let us display our '{{var}}' variables with specific formatting.
    return function(str) {
        if (!str) {
            return '';
        }
        var newstr = str.split("");
        newstr[0] = newstr[0].toUpperCase();
        newstr = newstr.join("");
        return newstr;
    }

});
app.directive("myDirective", function() {
    return {
        restrict: "EA",
        template: "<div style='background:#900;margin:2px;color:#fff;border-radius:3px;padding:2px;'>I'm in a directive!</div>",
        link: function(scope, elem, attrs) {
            elem.bind('mouseenter', function() {
            	console.log(elem[0].tagName)
                var typeodir = elem[0].tagName.toUpperCase()=='DIV'?'element':'attribute';
                elem.html('<div style="display:block;background:#b00;margin:2px;color:#fff;border-radius:3px;padding:2px;">I&rsquo;m in an '+typeodir+' directive!</div>');
            });
            elem.bind('mouseout',function() {
                elem.html('<div style="display:block;background:#900;margin:2px;color:#fff;border-radius:3px;padding:2px;">I&rsquo;m in a directive!</div>');
            });
        }
    };
});

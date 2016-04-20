//both bits of code should ESSENTIALLY do the same thing
// complex old vanilla JS stuff
var comCollection = [];
var comAdd = document.querySelector('#comAdd');
var comRem = document.querySelector('#itemAddBox');
var comTbl = document.querySelector('#complex table tbody');
console.log('ITEMS:', comAdd, comRem, comTbl);
comAdd.onclick = function() {
    comCollection.push({
        name: comRem.value,
        id: Math.floor(Math.random() * 9999999).toString(32)
    });
    console.log(comCollection)
    writeTable();
}
var writeTable = function() {
    comTbl.innerHTML = '';
    for (var i = 0; i < comCollection.length; i++) {
        comTbl.innerHTML += '<tr><td>' + i + '</td><td>' + comCollection[i].name + '</td><td> <button class="btn btn-danger" onclick=\'remItem("' + comCollection[i].id + '")\'>X</button></td></tr>';
        // Just look at how complex the quotes are! Escape sequences!
        comRem.value='';
    }
}
var remItem = function(itemId) {
    console.log('rem item ', itemId)
    for (var j = 0; j < comCollection.length; j++) {
        if (comCollection[j].id == itemId) {
            comCollection.splice(j, 1);
        }
    }
    writeTable();
}

// Awesome AngularJS stuff
var app = angular.module("angApp", []).controller("MainController", function($scope, $q) {
    //More about these includes later!
    //below: the glorious $scope object (yes, it's an object!)
    $scope.coll = [];
    $scope.addThing = function() {
        $scope.coll.push({
            name: $scope.itemToAdd,
            id: Math.floor(Math.random() * 9999999).toString(32)
        });
        $scope.itemToAdd='';//clear the div
    }
    $scope.removeThing = function(itm) {
    	itm = typeof itm!='object'?JSON.parse(itm):itm;//lets make sure it's an object
        for (var k = 0; k < $scope.coll.length; k++) {
            if ($scope.coll[k].id == itm.id) {
                $scope.coll.splice(k, 1);
            }
        }
    }
    //note that we're 'missing' an ENTIRE function here (the 'writeTable' fn from above). This is because Angular does this automatically!
});

app.controller("wthController", function($scope, $q,$http) {
    $scope.weatherData='ERROR';
    $scope.whereIsIt='Type a city below!'
    $scope.t;
    $scope.getWeather = function(){
    	var uriFront = 'https://query.yahooapis.com/v1/public/yql?q=';
    	var uriBack = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    	var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+$scope.whereCty+'")'
    	var fullUri = uriFront+encodeURIComponent(query)+uriBack;
    	$http.get(fullUri).then(function(wRes){
    		console.log(wRes)
    		$scope.whereIsIt = wRes.data.query.results.channel.description
    		$scope.weatherData = wRes;
    	})
    }
    $scope.timerFunc = function(){
    	if ($scope.t){
    		clearTimeout($scope.t);
    	}
    	$scope.t = setTimeout(function(){
    		$scope.getWeather();
    	},750)
    }
    $scope.getStyle = function(day){
    	//here, we're using the high temp to color the div. Higher temp = redder, lower temp = bluer
    	var hue = Math.floor(160*(Math.max(30,Math.min(95,day.high))-30)/65);
    	var hslBg = 'hsl('+(200+hue)+',100%,80%)';
    	return {
    		"background":hslBg
    	};
    }
});

//just some convenience functions
$("#angTxt").keyup(function(event){
    if(event.keyCode == 13){
        $("#angBut").click();
    }
});

$("#itemAddBox").keyup(function(event){
    if(event.keyCode == 13){
        $("#comAdd").click();
    }
});
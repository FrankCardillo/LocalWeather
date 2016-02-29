var app = angular.module('LocalWeather', []);
app.controller('MainCtrl', function($scope, $http) {

  //declaring the variables for my html elements and API key
  $scope.appId = "1c28f9fac8eca152c4f97813e4d05be1";
  $scope.locationDiv = document.getElementById("loc");
  $scope.weatherDiv = document.getElementById("weather");
  $scope.windDiv = document.getElementById("wind");
  $scope.temp = document.getElementById("temp");
  $scope.theIcon = document.getElementById("myIcon");

  //geolocation success callback function
  $scope.foundLocation = function(position) {
    /* vars with the user's latitude and longitude, the position object passed as a parameter to this callback function is not accessible in the synchronous flow, so we have to do all the heavy lifting inside this asynchronous call */
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // for api call
    var apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + "&APPID=" + $scope.appId;

    /* this function actually does the api call and then uses the JSON received from that to update all of the html elements on our page, again inside the scope of the geolocation success callback function (within the asynchronous flow) */
    $scope.fetch = function() {
      $http.get(apiURL).success(function(response) {
        $scope.locationDiv.innerHTML = response.name;
        $scope.weatherDiv.innerHTML = response.weather[0].description;
        $scope.temp.innerHTML = Math.ceil((response.main.temp * (9.0 / 5.0)) - 459.67) + ' F';
        $scope.windDiv.innerHTML = Math.ceil(response.wind.speed * 2.236936) + ' mph';
        $scope.theIcon.innerHTML = ("<img class='weatherIcon' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        if (response.weather[0].main === "Thunderstorm" || response.weather[0].main === "Rain" || response.weather[0].main === "Drizzle") {
          $("body").css("background", "url('https://aditty.files.wordpress.com/2011/01/20100616_191436.jpg')");
        } else if (response.weather[0].main === "Clear") {
          $("body").css("background", "url('https://upload.wikimedia.org/wikipedia/commons/6/62/Clear_weather_clouds.jpg')");
        } else if (response.weather[0].main === "Snow") {
          $("body").css("background", "url('http://img10.deviantart.net/cfd4/i/2010/317/a/8/snowy_day_by_bellefoto-d32roh0.jpg')");
        } else if (response.weather[0].main === "Clouds") {
          $("body").css("background", "url('http://www.artween.com/var/artween/storage/images/individuals/forrester-ellen/theme/cloudy-day/700883-1-eng-US/Cloudy-Day_reference.jpg')");
        } else {
          $("body").css("background", "blue");
        }
      });
    }
    $scope.fetch();

  };

  //geolocation failure callback function
  $scope.noLocation = function() {
    alert('Could not find location');
  };

  //defining our geolocation function to get user's latitude and longitude
  $scope.getLocation = function() {

    navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation);
  };

  //calling the geolocation function to get user's latitude and longitude
  $scope.getLocation();
});

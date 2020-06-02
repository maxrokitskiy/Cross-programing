let map;
let marker;
let myLatLng = {lat: 49.2327800, lng: 28.4809700};
let weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat="+myLatLng.lat+"&lon="+myLatLng.lng+"&lang=ru&appid=0b93cd070c7162d5291e75495a66f000";
let baseWeather;
	getWeather(weatherAPI);
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 10,
          
        });

        map.addListener('center_changed', function() {
          window.setTimeout(function() {
            map.panTo(marker.getPosition());
          }, 5000);
        });

        marker = new google.maps.Marker({
    		position: myLatLng,
    		map: map,
    		icon:'marker.png',
          	animation: google.maps.Animation.DROP,
    		title: 'Nice'
		});

        marker.addListener('click', function() {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
          if (marker.getAnimation() !== null) {
	          marker.setAnimation(null);
	          map.setZoom(10);
	        } else {
	          marker.setAnimation(google.maps.Animation.BOUNCE);
	       }
        });
        map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
        myLatLng.lat = e.latLng.lat();
        myLatLng.lng = e.latLng.lng();
        var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat="+myLatLng.lat+"&lon="+myLatLng.lng+"&lang=ru&appid=0b93cd070c7162d5291e75495a66f000";
        getWeather(weatherAPI);
        });
 		function placeMarker(location) {
        if (marker == null){
            marker = new google.maps.Marker({
            position: myLatLng,
            map: map
          });
          }else {
              marker.setPosition(location);
            }
    	}   
    }

	function getWeather(weatherAPI){
          fetch(weatherAPI)  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' + response.status);  
		        return;  
		      }  
		      response.json().then(function(data) {  
		        baseWeather = data;
            	showWeather();
            	console.log(baseWeather);  
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
		  });
        }
        function showWeather(){
          contentInfo = 
          "<br>"+"    Обране місто : "+"<br>"+baseWeather.name +"<br>"+"<br>"+"  Погода :"+"<br>"+baseWeather.weather[0].description +"<br>"+"<br>"+
          "  Температура : " +"<br>"+ Math.floor(baseWeather.main.temp - 273.15) +" °C"+"<br>"+"<br>";
          document.getElementById('display').innerHTML=contentInfo +"<br>"+'<image src="http://openweathermap.org/img/w/'+baseWeather.weather[0].icon+'.png" hspace="65" height="70" width="70">';
        }

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import loadGoogleMapsApi from 'load-google-maps-api';

$(document).ready(function() {
    $("#geolocation").submit(function(event) {
        event.preventDefault();
        let userInput = $("#userInput").val();
        console.log(userInput);
        $(".map").show();
        let latitude, longitude;

        function cityCall() {
            return new Promise(function(resolve, reject) {
              let request = new XMLHttpRequest();
              let url = `https://api.opencagedata.com/geocode/v1/json?q=${userInput}&key=3a961f44a5bf40d0b167a7b118598b81&limit=1`;
      
              request.onload = function() {
                if (this.status === 200) {
                  resolve(request.response);
                } else {
                  reject(Error(request.statusText));
                }
              }
      
              request.open("GET", url, true);
              request.send();
              console.log(request);
            });
          }



          cityCall()
            .then(function(response) {
                    let body = JSON.parse(response);
                    console.log(body);
                    latitude = body.results[0].geometry.lat;
                    longitude = body.results[0].geometry.lng;
                    console.log(latitude, longitude)
                    return [latitude, longitude]
            })
            .then( function([latitude, longitude]){
                loadGoogleMapsApi({'key':'AIzaSyB-Mgt8OR12z9WUmehS8HIQoCq_ItoMV_U'}).then(function (googleMaps) {
                    new googleMaps.Map(document.querySelector('.map'), {
                        center: {
                            lat: latitude,
                            lng: longitude
                        },
                    zoom: 12
            })
            }).catch(function (error) {
             console.error(error)
            })
        })
        
    })

});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -8.0460856, lng: -35.0725769},
    zoom: 8
  });
}


var markers = [];

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://172.19.5.156/hackthon_recife/_arvore.php?metodo=searchArvore",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "5cae4e4e-8619-f682-e8bb-2b04ffbb8a44"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

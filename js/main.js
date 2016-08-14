var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -8.0460856, lng: -35.0725769},
    zoom: 8
  });
}


var markers = [];

function setMarkers(){
  var json = (function){
    var json = null;
    $.ajax({

    })
  }
}

for (var i = 0, length = json.length; i < length; i++){
  var data = json[i],
  LatLng = new google.maps.LatLng(data.lat, data.lng);

  if(bounds.contains(LatLng)){
    var marker = new google.maps.Marker({
      position: LatLng,
      map: map
    });
  }

}

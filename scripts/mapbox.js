// DID YOU FORK THIS EXAMPLE?
// Enter your access token below
// and uncomment the line to keep your
// project online!
// Need a token? Create free account 
// mapbox.com/signup
// ***********************************************
// mapboxgl.accessToken = 'YOUR-ACCESS-TOKEN-HERE';
   mapboxgl.accessToken = 'pk.eyJ1IjoiYnBhY2h1Y2EiLCJhIjoiY2lxbGNwaXdmMDAweGZxbmg5OGx2YWo5aSJ9.zda7KLJF3TH84UU6OhW16w';
// ***********************************************
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [0, 0],
  zoom: 2
});

var framesPerSecond = 15; 
var initialOpacity = 1
var opacity = initialOpacity;
var initialRadius = 6;
var radius = initialRadius;
var maxRadius = 18;

map.on('load', function () {

  // Add a source and layer displaying a point which will be animated in a circle.
  map.addSource('point', {
      "type": "geojson",
      "data": {
          "type": "Point",
          "coordinates": [
              0, 0
          ]
      }
  });

  map.addLayer({
      "id": "point",
      "source": "point",
      "type": "circle",
      "paint": {
          "circle-radius": initialRadius,
          "circle-radius-transition": {duration: 0},
          "circle-opacity-transition": {duration: 0},
          "circle-color": "#007cbf"
      }
  });

  map.addLayer({
      "id": "point1",
      "source": "point",
      "type": "circle",
      "paint": {
          "circle-radius": initialRadius,
          "circle-color": "#007cbf"
      }
  });


  function animateMarker(timestamp) {
      setTimeout(function(){
          requestAnimationFrame(animateMarker);

          radius += (maxRadius - radius) / framesPerSecond;
          opacity -= ( .9 / framesPerSecond );

          map.setPaintProperty('point', 'circle-radius', radius);
          map.setPaintProperty('point', 'circle-opacity', opacity);

          if (opacity <= 0) {
              radius = initialRadius;
              opacity = initialOpacity;
          } 

      }, 1000 / framesPerSecond);
      
  }

  // Start the animation.
  animateMarker(0);
});
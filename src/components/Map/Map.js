import React, { useState, useEffect, useCallback, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { useDispatch} from 'react-redux';
const API_KEY = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;
// import currentBusinessStore from '../redux/store';

export default function Map({ onClick, businesses, clickedBusiness }) {
  const [mapOpen, setMapView] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState();
  const [stateMarkers, setStateMarkers] = useState([]);
  // const businessId = useRef();
  let currentMarkers = useRef([]);

  const dispatch = useDispatch();
  // const globalState = useSelector(state => state);

  const renderMap = useCallback(() => {
    loadScript("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js");
    window.initMap = initMap;
    window.initMap();
  }, []);
  
  // https://docs.mapbox.com/help/tutorials/building-a-store-locator/#make-the-map-interactive
  
  const initMap = () => {
    // var map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -33.8688, lng: 151.2195},
    //   zoom: 13
    // });
    
    // console.log('initMap running')
    // console.log(businesses.map(business => Number(business.coordinates.longitude.toFixed(3))))
    // console.log(businesses.map(business => business))
    mapboxgl.accessToken = API_KEY;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 3
    });

    map.on("load", () => {
      setMap(map);
      map.resize();
    })
  }


  const updateMarkers = useCallback(() => {
    var geojson = {
      type: 'FeatureCollection',
      features: businesses.map(business => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [business.coordinates.longitude, business.coordinates.latitude]
          },
          properties: {
            title: business.name,
            address: business.address,
            city: business.city,
            category: business.category,
            url: business.url,
            id: business.id
          }
        }
      })
      
      // [{
      //   type: 'Feature',
      //   geometry: {
      //     type: 'Point',
      //     coordinates: [-77.032, 38.913]
      //   },
      //   properties: {
      //     title: 'Mapbox',
      //     description: 'Washington, D.C.'
      //   }
      // },
      // {
      //   type: 'Feature',
      //   geometry: {
      //     type: 'Point',
      //     coordinates: [-122.414, 37.776]
      //   },
      //   properties: {
      //     title: 'Mapbox',
      //     description: 'San Francisco, California',
      //     haircut: 'bald'
      //   }
      // }]
    };
    // console.log(geojson);
    


    // remove previous markers
    // setTimeout(() => {
      if (currentMarkers.current !== businesses) {
        currentMarkers.current.forEach(marker => marker.remove());
        currentMarkers.current = [];
        console.log("remove existing markers!", currentMarkers)
      }
    // }, 2000);
  

    // add markers to map
    geojson.features.forEach(function(marker) {
    
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    


    // make a marker for each feature and add to the map
    let myMarker = new mapboxgl.Marker(el);
    myMarker.setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.city + '</p>' + marker.properties.category + '<a href="' + marker.properties.url + '" target="_blank"><p>Yelp Page</p><a>'))
    .addTo(map);
    currentMarkers.current.push(myMarker);
    setStateMarkers([currentMarkers.current]);
    // console.log("currentMarkers!", currentMarkers);


      function flyToArea(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 10
        });
      }

      flyToArea(marker);

      function flyToSpot(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 14
        });
      }
      
      el.addEventListener('click', function(e) {
        flyToSpot(marker);
        // businessId.current = marker.properties.id;
        // console.log(marker.properties.address);
        // console.log("ClickedBusiness: ", clickedBusiness)
        // console.log(currentMarkers.current[2]._lngLat.lng.toFixed(4));
        dispatch({ type: "MARKER_CLICKED", payload: marker.properties.id })
        // console.log(globalState);
        // console.log("clicked", marker)
      })

      currentMarkers.current.forEach(marker => {
        // if (marker._lngLat.lng.toFixed(4) === clickedBusiness) {
        if (clickedBusiness) {
          // flyToSpot(marker);
          // console.log("clicked", marker)
        }
      })

    });

  }, [businesses]);


  function flyToSpot(currentFeature) {
    map.flyTo({
      center: currentFeature.coordinates,
      zoom: 14
    });
  }

  useEffect(() => {
    if (businesses && clickedBusiness) {
      flyToSpot({coordinates: [clickedBusiness[0], clickedBusiness[1]]})
      // console.log(currentMarkers.current[2]._lngLat.lng.toFixed(4));
      
      currentMarkers.current.forEach(marker => {
        if (marker._lngLat.lng.toFixed(4) === Number(clickedBusiness[0]).toFixed(4)) {
          // marker.openPopup(marker);
          // console.log(marker._lngLat.lng.toFixed(4), "marker");
          // console.log(Number(clickedBusiness[0]).toFixed(4), "business");
        }
      });
    }
  } ,[clickedBusiness])


  useEffect(() => {
    renderMap();
    console.log("first rendermap() launched")
  }, [renderMap])


  useEffect(() => {
    // console.log("businesses Array", businesses)
    // removeMarkers();
    updateMarkers();
  }, [businesses])



  function handleClick() {

    // console.log(clickedBusiness);
    // console.log(currentMarkers.current);
    // console.log(stateMarkers);
    if (!mapLoaded) {
      // renderMap();
      setMapLoaded(true);
    }
    onClick();
    setMapView(mapOpen => mapOpen = !mapOpen)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  // // Map box sticky scroll attempt 1: 
  // useEffect(() => {
  //   // window.onload = function() {
  //     window.onscroll = function() {stickyMap()};

  //     // Get the header
  //     var myMap = document.getElementById("mapContainer");
  //     // let myMap = document.querySelector('.mapComponent');

  //     // Get the offset position of the navbar
  //     let sticky = myMap.offsetTop;

  //     // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  //     function stickyMap() {
  //       if (window.pageYOffset > sticky) {
  //         myMap.classList.add("sticky");
  //         console.log("yoyoyo!")
  //       } else {
  //         myMap.classList.remove("sticky");
  //         console.log("up top!")
  //       }
  //     }
  //   // }
  // }, [])

  useEffect(() => {
    const map = document.querySelector('#mapContainer');
    const button = document.querySelector('.mapButton');
    button.addEventListener('click', function() {
      if (map.style.display === "block") {
        map.style.display = "none";
      } else {
        map.style.display = "block";
      }
    })
  }, [])


  // const toggleMap = mapOpen ? {visibility: "visible", width: "45%", display: "block"} : {visibility: "hidden", width: "0%", display: "none"};
  // const BusinessListWidth = this.state.mapOpen ? {width: "45%"} : {width: "100%"};
  // const toggleMap = this.state.mapOpen ? {display: "block"} : {display: "none"};
  // const toggleMap = this.state.mapOpen ? "mapViewOn" : "mapViewOff";
  // document.querySelector('#map').classList.toggle('mapViewOn');
  const buttonStatus = mapOpen ? "Hide Map" : "Show Map";

  return (
    <div className="mapBackground">
     <div className="mapButtContainer">
       <button className="mapButton" onClick={handleClick}>{buttonStatus}</button>
     </div>

      <div id="mapContainer">
        <div id='map'></div>
      </div>





      {/* OLD GOOGLE MAPS JSX/HTML */}
      {/* <div ref={el => this.mapContainer = el} style={mapOpen} className="mapContainer" /> */}
        

        {/* <section style={mapView}>
          <div className="pac-card" id="pac-card">
            <div>
              <div id="title">
                Autocomplete search
              </div>
              <div id="type-selector" className="pac-controls">
                <input type="radio" name="type" id="changetype-all" checked="checked" />
                <label htmlFor="changetype-all">All</label>

                <input type="radio" name="type" id="changetype-establishment" />
                <label htmlFor="changetype-establishment">Establishments</label>

                <input type="radio" name="type" id="changetype-address" />
                <label htmlFor="changetype-address">Addresses</label>

                <input type="radio" name="type" id="changetype-geocode" />
                <label htmlFor="changetype-geocode">Geocodes</label>
              </div>
              <div id="strict-bounds-selector" className="pac-controls">
                <input type="checkbox" id="use-strict-bounds" value="" />
                <label htmlFor="use-strict-bounds">Strict Bounds</label>
              </div>
            </div>
            <div id="pac-container">
              <input id="pac-input" type="text"
                  placeholder="Enter a location" />
            </div>
          </div>

          <div id="map"></div>
          <div id="infowindow-content">
            <img src="" width="16" height="16" id="place-icon" />
            <span id="place-name"  className="title"></span><br></br>
            <span id="place-address"></span>
          </div>
        </section> */}
    </div>
  )
}


// Loads the MapBox API script
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  // const head = window.document.getElementsByTagName('head')[0];
  const script = window.document.createElement('script');
  // script.type = "text/javascript"
  script.src = url;
  // script.async = true;
  // script.defer = true;
  // head.append(script);
  index.parentNode.insertBefore(script, index);
  // console.log('loadScript script loaded')
};
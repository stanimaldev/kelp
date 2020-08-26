import React from 'react';
// import logo from '../../favicon.ico';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp'
// import Map from '../Map/Map';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      businesses: [],
      isLoading: '',
      mapView: false
    }
    this.searchYelp = this.searchYelp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  searchYelp(term, location, sortBy) {
    this.setState({isLoading: true})

    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({businesses: []})

      if (!businesses || businesses.length < 1) {
        let p = document.createElement('p');
        let noresults = document.querySelector('.noresults');
        p.textContent = "No results found! 😱😢";
        p.style.cssText = "color: white; background: red; padding: 20px; border-radius: 4px; text-align: center; width: 300px; font-size: 1.3rem";
        noresults.append(p);
        console.log("NOTHING FOUND!");
        setTimeout(() => {
          noresults.removeChild(p);
        }, 5000);
      } else {
        this.setState({businesses: businesses});
      }
    });
      // console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`)
  };


  componentDidUpdate(prevProps, prevState) {
    // console.log("App componentDidUpdate!")
    if (prevState.isLoading) {
      this.setState({isLoading: false})
    }
  }

  handleClick() {
    this.setState({
      mapView: !this.state.mapView
    })
    // console.log('clicked!', this.state.mapView)
  }




  /* GOOGLE MAP // LIFESAVER video: https://www.youtube.com/watch?v=W5LhLZqj76s (initMap is not a function error: because the script needs to look at the 'window' level. so at window.document.body.. etc. window.initMap = this.initMap)*/
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDfQECiv76aHMFx5eDdQgOnK-KqV6qNUcs&callback=initMap&libraries=places&v=weekly");
    window.initMap = this.initMap;
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new window.google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new window.google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function() {
          console.log('Checkbox clicked! New state=' + this.checked);
          autocomplete.setOptions({strictBounds: this.checked});
        });
  }





  render() {

    const mapView = this.state.mapView ? {display: "block"} : {display: "none"};
    const buttonStatus = this.state.mapView ? "Grid View" : "Map View";

    return (
      <div className="App">
        <h1><a href="/" style={{textDecoration: 'none', color: "white"}}>ravenous</a></h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <div className="noresults" style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', position: 'absolute'}}></div>
        <div className="mapButtContainer">
          <button className="mapButton" onClick={this.handleClick}>{buttonStatus}</button>
        </div>

        <section style={mapView}>
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
        </section>
        

        


        {this.state.isLoading ? <div className="loader"><img src="https://miro.medium.com/max/700/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="icon" /><p></p></div> : <BusinessList businesses={this.state.businesses}/>}
      </div>
    );
  }
}


// Loads the Google Maps API
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement('script');
  // script.type = "text/javascript"
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
};



export default App;




// https://www.codecademy.com/paths/build-web-apps-with-react/tracks/bwa-ajax-requests-and-api-interactions/modules/bwa-ravenous-part-four/projects/interacting-with-yelp-api
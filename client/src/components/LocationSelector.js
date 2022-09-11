import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { connect } from 'react-redux';
// import Geocode from "react-geocode";

// // Geocode.setApiKey("");
// // Geocode.setLanguage("es");
// // Geocode.setRegion("pe");
// // // google geocoder returns more that one address for given lat/lng.
// // // In some case we need one address as response for which google itself provides a location_type filter.
// // // So we can easily parse the result for fetching address components
// // // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// // // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// // Geocode.setLocationType("ROOFTOP");

// // // Get address from latitude & longitude.
// // Geocode.fromLatLng("-12.0672834", "-77.0685771").then(
// //     (response) => {
// //       const address = response.results[0].formatted_address;
// //       console.log(address);
// //     },
// //     (error) => {
// //       console.error(error);
// //     }
// //   );

// // // Get formatted address, city, state, country from latitude & longitude
// // Geocode.fromLatLng("-12.0677973", "-77.0658706").then(
// //     (response) => {
// //       const address = response.results[0].formatted_address;
// //       let city, state, country;
// //       for (let i = 0; i < response.results[0].address_components.length; i++) {
// //         for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
// //           switch (response.results[0].address_components[i].types[j]) {
// //             case "locality":
// //               city = response.results[0].address_components[i].long_name;
// //               break;
// //             case "administrative_area_level_1":
// //               state = response.results[0].address_components[i].long_name;
// //               break;
// //             case "country":
// //               country = response.results[0].address_components[i].long_name;
// //               break;
// //           }
// //         }
// //       }
// //       console.log(city, state, country);
// //       console.log(address);
// //     },
// //     (error) => {
// //       console.error(error);
// //     }
// //   );

// // // Get latitude & longitude from address.
// // Geocode.fromAddress("Eiffel Tower").then(
// //     (response) => {
// //       const { lat, lng } = response.results[0].geometry.location;
// //       console.log(lat, lng);
// //     },
// //     (error) => {
// //       console.error(error);
// //     }
// //   );

// const getCoords = ({ address }) => {
//     Geocode.fromAddress(address).then(
//         (response) => {
//           const { lat, lng } = response.results[0].geometry.location;
//           console.log(lat, lng);
//           return { lat, lng }
//         },
//         (error) => {
//           console.error(error);
//         }
//     );

//     return { lat: null, lng: null };
// }

const getLocationMarker = ({ lat, lng }) => {
    if (lat !== null) {
        return <Marker
        key={'userMarker'}
        position={{ lat, lng }}
        icon={{
            url: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
            scaledSize: {
                width: 40,
                height: 40,
            },
        }}
      />
    } else return <></>
    
}

const containerStyle = {
    width: '60vw',
    height: '400px'
};
  
const LocationSelector = ({ lat, lng }) => {
  if (!lat) return <></>;
  
  const center = { lat, lng };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyArrmZomwzcEXVw9j7Z-AgffwjLbTUI5t4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={0.1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {getLocationMarker({ lat, lng })}
        
        <></>
      </GoogleMap>
  ) : <></>
  }

  const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(LocationSelector);
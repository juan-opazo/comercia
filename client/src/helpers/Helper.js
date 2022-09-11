import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyArrmZomwzcEXVw9j7Z-AgffwjLbTUI5t4");
Geocode.setLanguage("es");
Geocode.setRegion("pe");
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

export const getFullLocation = async (lat, lng) => {
  if (lat == undefined) return { address: '', city: '', state: '', country: '' };

  const response = await Geocode.fromLatLng(`${lat}`, `${lng}`);
  const address = response.results[0].formatted_address;
  let city, state, country;
  for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
      switch (response.results[0].address_components[i].types[j]) {
          case "locality":
          city = response.results[0].address_components[i].long_name;
          break;
          case "administrative_area_level_1":
          state = response.results[0].address_components[i].long_name;
          break;
          case "country":
          country = response.results[0].address_components[i].long_name;
          break;
      }
      }
  }
  console.log(city, state, country);
  console.log(address);
  return { address, city, state, country }
}

export const getCoords = async (address) => {
  if (address == '') return { lat: undefined, lng: undefined };

  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  return { lat, lng }
}

export const getBase64 = (file, updateImgSrc) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      updateImgSrc(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}

// export default getBase64;
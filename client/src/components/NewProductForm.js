import React from 'react';
import { Button, Icon, Image, Modal, Item, Form } from 'semantic-ui-react';
import LocationSelector from './LocationSelector';

import Geocode from "react-geocode";

Geocode.setApiKey("");
Geocode.setLanguage("es");
Geocode.setRegion("pe");
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

class NewProductForm extends React.Component {
    state = { 
        open: false,
        name: '', 
        price: undefined,
        brand: '',
        store: '', 
        location: '',
        address: '',
        city: '',
        state: '',
        country: '',
        latitude: undefined,
        longitude: undefined,
        submittedName: '', 
        submittedPrice: undefined,
        submittedBrand: '',
        submittedStore: '', 
        submittedLocation: '',
        submittedAddress: '',
        submittedCity: '',
        submittedState: '',
        submittedCountry: '',
        submittedLatitude: undefined,
        submittedLongitude: undefined,
    }

    getCoords = async (address) => {
        if (address == '') return { lat: undefined, lng: undefined };

        const response = await Geocode.fromAddress(address);
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng }
    }

    getFullLocation = async (lat, lng) => {
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

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
    handleSubmit = async () => {
        // const { name, price, brand, store, location } = this.state
        console.log(this.state);
        // const myPromise = new Promise((this.getCoords, _) => {
        //     const { lat, lng } = this.getCoords(this.state.location);
        // });
        // myPromise.then(res => console.log(`response: ${res}`)).catch(e => console.error(e));
        const { lat, lng } = await this.getCoords(this.state.location);
        console.log(lat, lng);
        const { address, city, state, country } = await this.getFullLocation(lat, lng);
        this.setState({ 
            submittedName: this.state.name,
            submittedPrice: this.state.price,
            submittedBrand: this.state.brand,
            submittedStore: this.state.store, 
            submittedLocation: this.state.location,
            submittedAddress: address,
            submittedCity: city,
            submittedState: state,
            submittedCountry: country,
            submittedLatitude: lat,
            submittedLongitude: lng,
        },
        () => console.log(this.state)//() => this.setState({ open: false })
        );
        console.log(this.state);
    }

  render() {
    const { name, price, brand, store, location } = this.state;

    return (
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          trigger={<Item> <Button circular icon='plus' size='huge'/> </Item>}
        >
          <Modal.Content image scrolling>
            <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
    
            <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                        <label>Nombre del Producto</label>
                        <Form.Input
                            placeholder=''
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Precio</label>
                        <Form.Input
                            placeholder=''
                            name='price'
                            value={price}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Marca</label>
                        <Form.Input
                            placeholder=''
                            name='brand'
                            value={brand}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Tienda</label>
                        <Form.Input
                            placeholder=''
                            name='store'
                            value={store}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.TextArea label='Descripcion' placeholder='' />
                    <Form.Field required>
                        <label>Ubicacion</label>
                        <Form.Input
                            placeholder=''
                            name='location'
                            value={location}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Button content='Enviar' className='padding-1'/>
                </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      )
  }
  
}

export default NewProductForm 
import React from 'react';
import { Button, Icon, Image, Modal, Item, Form, Input } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import Geocode from "react-geocode";
import comercia from '../apis/comercia';

Geocode.setApiKey("AIzaSyArrmZomwzcEXVw9j7Z-AgffwjLbTUI5t4");
Geocode.setLanguage("es");
Geocode.setRegion("pe");
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

const getFullLocation = async (lat, lng) => {
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

const getCoords = async (address) => {
  if (address == '') return { lat: undefined, lng: undefined };

  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  return { lat, lng }
}

const getBase64 = (file, updateImgSrc) => {
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

const NewProductForm = ({ userPosition }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, trigger, getValues, formState: { errors } } = useForm();
    const [open, setOpen] = React.useState(false);
    const [previewImg, setPreviewImg] = React.useState('https://react.semantic-ui.com/images/wireframe/image.png');
    const [uploadedImg, setUploadedImg] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [location, setLocation] = React.useState({});
    console.log(userPosition);
    const saveProduct = async () => {
        const isValid = await trigger(["name", "price"], { shouldFocus: true });
        if(isValid){
            setLoading(true);
            const values = getValues();
            console.log(getValues());
            console.log(uploadedImg);
            const data = new FormData();
            data.append('price', values.price);
            data.append('name', values.name);
            data.append('image', uploadedImg);
            // const data = {
            //   name: 'test',
            //   price: 2,
            // }
            const response = await comercia.post('/products/', data);
            // response.then(res => console.log(res));
            console.log(response)
        } else {
            console.error(errors)
        }
    }

  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      getBase64(fileUploaded, setPreviewImg);
      setUploadedImg(fileUploaded);
    }
    
  };
  const openModal = () => {
    setOpen(true);
    console.log(location)
    // if (Object.keys(location).length === 0) getFullLocation(userPosition.latitude, userPosition.longitude).then(res => setLocation(res))
  }
  
  return (
    <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => openModal()}
          trigger={<Item> <Button circular icon='plus' size='huge'/> </Item>}
        >
          <Modal.Content image scrolling>
            <Image className='upload-image' onClick={handleClick} size='medium' src={previewImg} wrapped />
    
            <Modal.Description>
                <Form>
                    <Form.Field required>
                        <label>Nombre del Producto</label>
                        <input
                            type="text" 
                            placeholder="Nombre del Producto" 
                            {...register("name", {required: true})}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Precio</label>
                        <input
                            type="number" 
                            placeholder="Precio" 
                            {...register("price", {required: true, min: 0})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ubicacion</label>
                        <input
                            
                            type="text" 
                            value={location.address}
                            {...register("Ubicacion", {})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file" 
                            capture="environment"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{display:'none'}} 
                        />
                    </Form.Field>
                    {/* <input accept="image/*" id="icon-button-file" type="file" capture="environment"/> */}
                    <Form.Button content='Enviar' className='padding-1' type="submit" onClick={saveProduct}/>
                </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
  );
}
 
export default NewProductForm;
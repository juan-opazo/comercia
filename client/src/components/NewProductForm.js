import React from 'react';
import { Button, Icon, Image, Modal, Item, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import comercia from '../apis/comercia';
import { getBase64, getCoords } from '../helpers/Helper';
import { connect } from 'react-redux';
import  { Redirect, useHistory } from 'react-router-dom'

const defaultImg = 'https://react.semantic-ui.com/images/wireframe/image.png';

const NewProductForm = ({ userPosition, auth, syncProducts }) => {
  const { register, trigger, getValues, formState: { errors } } = useForm();
  const [open, setOpen] = React.useState(false);
  const [previewImg, setPreviewImg] = React.useState(defaultImg);
  const [uploadedImg, setUploadedImg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [authUser, setAuthUser] = React.useState(auth);
  // console.log('auth: ', authUser._id)
  const saveProduct = async () => {
      const isValid = await trigger(["name", "price", "location"], { shouldFocus: true });
      if(isValid && previewImg !== defaultImg){
          setLoading(true);
          const values = getValues();
          console.log(getValues());
          const { lat, lng } = await getCoords(values.location);

          const data = new FormData();
          data.append('price', values.price);
          data.append('name', values.name);
          data.append('created_by', authUser._id);
          if (values.location) data.append('location', values.location);
          if (lat) {
            data.append('latitude', lat);
            data.append('longitude', lng);
          }
          data.append('image', uploadedImg);
          console.log(data)
          const response = await comercia.post('/api/new_product/', data);
          setLoading(false);
          syncProducts();
          console.log(response);
          
          setUploadedImg(undefined);
          setPreviewImg(defaultImg);
          setOpen(false);
          
      } else {
          console.error(errors);
          if (previewImg === defaultImg) console.error('No ha subido una imagen');
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
  const openModal = () => setOpen(true);
  
  return (
    <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => openModal()}
          trigger={<Item> <Button circular icon='plus' size='huge'/> </Item>}
        >
          <Modal.Content image scrolling>
            <div className='flex-container wrap around width-100'>
            <Image className='upload-image margin-0_5' onClick={handleClick} size='medium' src={previewImg} wrapped />
    
    <Modal.Description>
        <Form>
            <Form.Field required>
                <label>Nombre del Producto</label>
                <input
                    type="text" 
                    {...register("name", {required: true})}
                />
            </Form.Field>
            <Form.Field required>
                <label>Precio</label>
                <input
                    type="number" 
                    step="any"
                    {...register("price", {required: true, min: 0})}
                />
            </Form.Field>
            <Form.Field>
                <label>Ubicacion</label>
                <input
                    
                    type="text" 
                    {...register("location", {})}
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
            <Form.Button content='Enviar' className='padding-1' type="submit" onClick={saveProduct}/>
        </Form>
    </Modal.Description>
            </div>
          </Modal.Content>
        </Modal>
  );
}
 
// export default NewProductForm;
const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(
  mapStateToProps
)(NewProductForm)
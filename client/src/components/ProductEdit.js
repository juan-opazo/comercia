import React from 'react'
import { Button, Image, Form, Grid } from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import { useForm } from 'react-hook-form';
import comercia from '../apis/comercia';
import { getBase64, getCoords } from '../helpers/Helper';

const showImagesSection = (images, previewImages) => {
    
    let items = images.map(image => (<Image src={image} key={image}/>));
    return (
        <Image.Group size='small'>
            {items}
        </Image.Group>
    )
}

const ProductEdit = ({ product, syncProducts, userPosition, setEditView }) => {
    // const [product, setProduct] = React.useState(products.find(product => product._id === productId));
    const { id } = useParams();
    const { register, trigger, getValues, formState: { errors } } = useForm();
    const [previewImg, setPreviewImg] = React.useState('https://react.semantic-ui.com/images/wireframe/image.png');
    const [previewImages, setPreviewImages] = React.useState([]);
    const [uploadedImg, setUploadedImg] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [currentProduct, setcurrentProduct] = React.useState(product);
    const noChanges = (values) => {
        return currentProduct.price == values.price &&
            currentProduct.name == values.name &&
            currentProduct.description == values.description &&
            currentProduct.brand == values.brand &&
            currentProduct.store == values.store &&
            currentProduct.location == values.location
    }
    const saveProduct = async () => {
        const isValid = await trigger([
            "name", 
            "price", 
            "description", 
            "brand", 
            "store", 
            "location"
        ], { shouldFocus: true });

        if(isValid){
            const values = getValues();
            if (noChanges(values)) {
                setEditView(false);
                return
            }
            setLoading(true);
            
            let data = {
                id: currentProduct._id,
                price: values.price,
                name: values.name,
                description: values.description,
                brand: values.brand,
                store: values.store,
                location: values.location,
            }
            if (values.location !== currentProduct.location) {
                const { lat, lng } = await getCoords(values.location);
                data = {
                    ...data,
                    latitude: lat,
                    longitude: lng
                }
            }
            const response = await comercia.put('/api/update_product/', data);
            console.log(response);
            syncProducts();
            setEditView(false);
        } else {
            console.error(errors);
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
          setPreviewImages([...previewImages, previewImg])
          const data = new FormData();
          data.append('id', product._id);
          data.append('image', fileUploaded);
          comercia.put('/api/add_image_to_product/', data)
            .then(res => {
                syncProducts();
                console.log(res);
            })
        }
        
    };
    return (
        <>
            {showImagesSection(product.images, previewImages)}
            
            <Image className='upload-image' onClick={handleClick} size='medium' src={previewImg} wrapped />
            <Form>
                <Form.Field required>
                    <label>Nombre del Producto</label>
                    <input
                        type="text" 
                        defaultValue={product.name}
                        {...register("name", {required: true})}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Precio</label>
                    <input
                        type="number" 
                        step="any"
                        defaultValue={product.price}
                        {...register("price", {required: true, min: 0})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Descripcion</label>
                    <input
                        type="text" 
                        defaultValue={product.description}
                        {...register("description", {required: false})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Marca</label>
                    <input
                        type="text" 
                        defaultValue={product.brand}
                        {...register("brand", {required: false})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Tienda</label>
                    <input
                        type="text" 
                        defaultValue={product.store}
                        {...register("store", {required: false})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Ubicacion</label>
                    <input
                        type="text"
                        defaultValue={product.location}
                        {...register("location", {required: false})}
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
                <Button size='big' icon='save'  onClick={saveProduct}></Button>
            </Form>
        </>
        
    );
}

const mapStateToProps = ({ auth, products }) => {
    return { auth, products };
}

export default ProductEdit;
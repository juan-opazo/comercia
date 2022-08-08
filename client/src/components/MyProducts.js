import _ from 'lodash'
import React from 'react'
import { Grid, Image, Item, Icon, Button } from 'semantic-ui-react'
import NewProductForm from './NewProductForm'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

const showProducts = (products) => {
    return products.map(product => 
        <Item key={product.id} onClick={() => console.log(product)}>
        <Item.Image size='small' src={product.image} />

        <Item.Content>
            <Item.Header as='a'>{product.name}</Item.Header>
            <Item.Description>{product.description}</Item.Description>
            <Item.Extra>
            <Icon color='red' name='heart' /> 121
            </Item.Extra>
        </Item.Content>
        </Item>
    )
}

const MyProducts = ({ products, userPosition }) => {
    return (
        <div className='flex-container wrap center padding-1'>
            <Item.Group>
                {showProducts(products)}
                <div className='flex-container center'>
                    <NewProductForm userPosition={userPosition}/>
                </div>
                
            </Item.Group>
        </div>
    );
}

export default MyProducts
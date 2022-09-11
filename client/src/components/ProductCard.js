import React from 'react';
import { Card, Icon, Image, Container, Transition } from 'semantic-ui-react';
import NumberOfComments from './NumberOfComments';
import Rating from './Rating';

const ProductCard = ({ product, onSelectProduct }) => {
    return (
        <Card onClick={() => onSelectProduct(product._id)}>
            <Image src={product.images?product.images[0]:'https://react.semantic-ui.com/images/wireframe/short-paragraph.png'} wrapped ui={false} />
            <Card.Content>
                <Card.Header>S/ {product.price}</Card.Header>
                <Card.Meta>{product.name} - {product.brand}</Card.Meta>
                <Card.Description> {product.description} </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='card-extra-container'>
                <Rating value={product.rating.length} />
                <NumberOfComments value={product.comments.length} />
                </div>
            </Card.Content>
        </Card>
    )
}

export default ProductCard;